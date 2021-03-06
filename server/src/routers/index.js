const userRouter = require('./user.router');
const eventRouter = require('./event.router');
const reviewRouter = require('./review.router');
const planRouter = require('./plan.router');
const POIRouter = require('./POI.router');
const chatRouter = require('./chat.router');
const locationRouter = require('./location.router');
const reviewTagRouter = require('./reviewTag.router');
const eventTagRouter = require('./eventTag.router');


module.exports = {
  userRouter,
  eventRouter,
  reviewRouter,
  planRouter,
  POIRouter,
  chatRouter,
  locationRouter,
  reviewTagRouter,
  eventTagRouter,
};
