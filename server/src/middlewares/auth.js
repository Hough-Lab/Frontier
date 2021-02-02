const models = require('../models').sequelize.models;
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

exports.authMiddleware = async (req, res, next) => {
  try {
    const encodedToken = req.cookies.authToken;
    const token = jwt.verify(encodedToken, JWT_SECRET);
    const user = await models.User.findOne({
      where: { userId: token.userId },
    });

    if (!user) {
      throw new Error('Unauthorised, please login');
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(500).send(e.message);
  }
};
