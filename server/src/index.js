const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();
const db = require('./models');
const routers = require('./routers');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', routers.userRouter);
app.use('/api/event', routers.eventRouter);
app.use('/api/review', routers.reviewRouter);
app.use('/api/plan', routers.planRouter);
app.use('/api/POI', routers.POIRouter);
app.use('/api/chat', routers.chatRouter);
app.use('/api/location', routers.locationRouter)

const server = require('http').createServer(app);

(async () => {
  let retries = 5;
  while (retries) {
    try {
      await db.sequelize.sync().then(() => {
        console.log(`Connected to Sequelize on 5432`);
      });
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  server.listen(PORT, () => console.log(`Listening on ${PORT}`));
})();
