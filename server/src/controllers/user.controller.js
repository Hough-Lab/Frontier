const bcrypt = require('bcrypt');
const uuid = require('uuid');

const models = require('../models').sequelize.models;
const { CreateUserTag } = require('./eventTag.controller');
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
    } = req.body;

    const { valid, errors } = validateRegisterInput({
      email,
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
    });

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

    // CreateUserTag(userTags);
    const hashedPw = await bcrypt.hash(password, 10);
    const userId = uuid.v4();
    const createdDate = new Date();
    const newUser = await models.User.create({
      userId,
      username,
      email,
      firstName,
      lastName,
      password: hashedPw,
      lastSeen: createdDate.toISOString(),
    });
    const token = await generateAuthToken(newUser.userId);
    res.status(201).send({ user: newUser, token });
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

exports.LoginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();
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

exports.EditProfile = async (req, res) => {
  try {
    const {
      username,
      firstName,
      lastName,
      email,
      dateOfBirth,
      from,
      language,
      profilePicture,
      userTags,
    } = req.body.editProfileObject;

    const user = req.user;

    if (username) {
      const existingUser = await models.User.findOne({
        where: { username: username },
      });
      if (existingUser || username.trim() === '') {
        res.status(500);
        return res.send({
          errors: { usernameAlreadyExists: 'Username invalid' },
        });
      }
    }

    if (email) {
      const existingEmail = await models.User.findOne({
        where: { email: email },
      });
      if (existingEmail || email.trim() === '') {
        res.status(500);
        return res.send({
          errors: {
            emailAlreadyExists: 'Invalid email',
          },
        });
      }
    }

    if (firstName && firstName.trim() === '') {
      return res.send({
        errors: {
          emailAlreadyExists: 'Invalid first name',
        },
      });
    }

    if (lastName && lastName.trim() === '') {
      return res.send({
        errors: {
          emailAlreadyExists: 'Invalid first name',
        },
      });
    }

    const newUser = await models.User.update(
      {
        username,
        firstName,
        lastName,
        email,
        dateOfBirth,
        from,
        language,
        userTags,
        profilePicture,
      },
      { where: { userId: user.userId }, returning: true, plain: true },
    );
    res.status(201).send({ user: newUser[1].dataValues });
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

exports.getAttendingEventsByUserId = async (req, res) => {
  const { userId } = req.user;

  try {
    const events = await models.Event.findAll();
    const attendingEvents = events.filter(
      (event) => event.dataValues.attendees.indexOf(userId) !== -1,
    );
    res.status(200).send(attendingEvents);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getInterestedEventsByUserId = async (req, res) => {
  const { userId } = req.user;

  try {
    const events = await models.Event.findAll();
    const attendingEvents = events.filter(
      (event) => event.dataValues.possibleAttendees.indexOf(userId) !== -1,
    );
    res.status(200).send(attendingEvents);
  } catch (error) {
    res.status(500).send(error);
  }
};
