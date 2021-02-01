const bcrypt = require('bcrypt');
const models = require('../models').sequelize.models;
const uuid = require("uuid");

const {validateRegisterInput, validateLoginInput} = require('../util/validators')

exports.RegisterUser = async (req, res) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      username,
      firstName,
      lastName,
      dateOfBirth,
      language,
      from,
      profilePicture,
      userTags,
    } = req.body;

    const {valid, errors} = validateRegisterInput(
      email, username, password, confirmPassword, firstName, lastName
    )

    if (!valid) {
      res.status(500)
      return res.send({errors})
    }
    const existingUser = await models.User.findOne({ where: { username: username } });
    if (existingUser) {
      res.status(500)
      return res.send({errors: { usernameAlreadyExists: 'Username not available'}})
    }
    const existingEmail = await models.User.findOne({ where: { email: email } });
    if (existingEmail) {
      res.status(500)
      return res.send({errors: { emailAlreadyExists: 'This email is already linked to an account'}})
    }

    const hashedPw = await bcrypt.hash(password, 10);
    const userId = uuid.v4();
    const createdDate = new Date()
    const newUser = await models.User.create({
      userId,
      username,
      email,
      firstName,
      lastName,
      dateOfBirth,
      language,
      from,
      profilePicture,
      userTags,
      password: hashedPw,
      lastSeen: createdDate.toISOString()
    });
    res.status(201);
    res.send(newUser);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};
