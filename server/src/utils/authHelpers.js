const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../config')

exports.generateAuthToken = (uuid) => {
  const token = jwt.sign({ userId: uuid }, JWT_SECRET);
  return token;
};