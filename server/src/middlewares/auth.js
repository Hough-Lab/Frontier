const models = require('../models').sequelize.models;
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    console.log(authHeader);
    const encodedToken = authHeader.split('Bearer ')[1];
    if (encodedToken) {
      const token = jwt.verify(encodedToken, JWT_SECRET);
      const user = await models.User.findOne({
        where: { userId: token.userId },
      });

      if (!user) {
        res.send('Unauthorised, please login');
      }
      req.user = user.dataValues;
      req.token = token;
      next();
    }
  } else {
    res.sendStatus(500).send('Authorisation header must be provided');
  }
};
