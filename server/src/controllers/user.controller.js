const bcrypt = require('bcrypt');
const uuid = require('uuid');

const models = require('../models').sequelize.models;
const { generateAuthToken } = require('../utils/authHelpers.js');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../utils/validators');

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

    const { valid, errors } = validateRegisterInput(
      email,
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
    );

    if (!valid) {
      res.status(500);
      return res.send({ errors });
    }
    const existingUser = await models.User.findOne({
      where: { username: username },
    });
    if (existingUser) {
      res.status(500);
      return res.send({
        errors: { usernameAlreadyExists: 'Username not available' },
      });
    }
    const existingEmail = await models.User.findOne({
      where: { email: email },
    });
    if (existingEmail) {
      res.status(500);
      return res.send({
        errors: {
          emailAlreadyExists: 'This email is already linked to an account',
        },
      });
    }

    const hashedPw = await bcrypt.hash(password, 10);
    const userId = uuid.v4();
    const createdDate = new Date();
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
      lastSeen: createdDate.toISOString(),
    });
    const token = await generateAuthToken(userId);
    res.status(201).send({ user: newUser, token });
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new Error('Invalid email or password');
    }

    // Returning true returns the plain object, and plain: true is to return the object itself without including unnecessary data.
    const userUpdated = await models.User.update(
      { lastSeen: new Date().toISOString() },
      { where: { email }, returning: true, plain: true },
    );

    // The response sent to the front end is userUpdated[1].dataValues because it is where Sequelize holds the user data
    const token = await generateAuthToken(user.userId);
    res.status(200).send({ user: userUpdated[1].dataValues, token });
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

exports.LogoutUser = async (req, res) => {
  const { email } = req.body;
  await models.User.update(
    { lastSeen: new Date().toISOString() },
    { where: { email } },
  );
  res.clearCookie('authToken');
  res.sendStatus(204);
};
exports.test = async (req, res) => {
  console.log('REQ.USER', req.user);
  console.log('REQ.TOKEN', req.token);
  res.send(JSON.stringify('user', req.user, 'req.token', req.token));
};
