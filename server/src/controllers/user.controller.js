const bcrypt = require('bcrypt');
const models = require('../models').sequelize.models;
const uuid = require('uuid');

exports.RegisterUser = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      language,
      from,
      profilePicture,
      userTags,
    } = req.body;
    const hashedPw = await bcrypt.hash(password, 10);
    const userId = uuid.v4();
    const newUser = await models.User.create({
      userId,
      email,
      firstName,
      lastName,
      dateOfBirth,
      language,
      from,
      profilePicture,
      userTags,
      password: hashedPw,
    });
    res.status(201);
    res.send(newUser);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};
