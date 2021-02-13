const uuid = require('uuid');
const models = require('../models').sequelize.models;
const { createPOI } = require('./pointOfInterest.controller');
const { CreateEventTag } = require('./eventTag.controller');

exports.PostEvent = async (req, res) => {
  try {
    const {
      formattedAddress,
      latitude,
      longitude,
      dateFrom,
      dateTo,
      title,
      description,
      maxCapacity,
      isPrivate,
      picture,
      tags,
    } = req.body;

    const user = req.user;

    CreateEventTag(tags);
    const newPOI = await createPOI(formattedAddress, latitude, longitude, tags);
    const eventId = uuid.v4();

    let pointOfInterestId;

    if (newPOI.length >= 1) {
      pointOfInterestId = newPOI[0].pointOfInterestId;
    } else {
      pointOfInterestId = newPOI.pointOfInterestId;
    }

    const newEvent = await models.Event.create({
      eventId,
      pointOfInterestId,
      dateFrom,
      dateTo,
      title,
      description,
      maxCapacity,
      isPrivate,
      picture,
      createdBy: user.userId,
      tags,
      attendees: [user.userId.toString()],
    });

    const poiToUpdate = await models.PointOfInterest.findByPk(
      pointOfInterestId,
    );
    if (!poiToUpdate.events) {
      poiToUpdate.events = [newEvent];
    } else {
      poiToUpdate.events = [poiToUpdate.events, newEvent];
    }
    await poiToUpdate.save();

    if (!newEvent) {
      throw new Error('could not add Event');
    } else {
      res.status(201).send(newEvent);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.GetAllEvents = async (req, res) => {
  try {
    const events = await models.Event.findAll();
    if (!events) throw new Error('No events found');
    res.status(200).send(events);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.GetEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await models.Event.findByPk(eventId);
    if (!event) throw new Error('Event not found');
    res.status(200).send(event);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.AttendEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const user = req.user;

    const event = await models.Event.findByPk(eventId);
    const currentAttendees = event.dataValues.attendees;

    if (currentAttendees.indexOf(user.userId) === -1) {
      currentAttendees.push(user.userId);
      const editedEvent = await models.Event.update(
        {
          attendees: currentAttendees,
        },
        { where: { eventId: eventId }, returning: true, plain: true },
      );
      res.status(200).send(editedEvent[1].dataValues);
    } else {
      res.status(200).send(event.dataValues);
    }

    if (!event) throw new Error('Event not found');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.UndoAttendEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const user = req.user;

    const event = await models.Event.findByPk(eventId);
    const currentAttendees = event.dataValues.attendees;

    if (currentAttendees.indexOf(user.userId) !== -1) {
      const userIndex = currentAttendees.indexOf(user.userId);
      currentAttendees.splice(userIndex, 1);
      const editedEvent = await models.Event.update(
        {
          attendees: currentAttendees,
        },
        { where: { eventId: eventId }, returning: true, plain: true },
      );
      res.status(200).send(editedEvent[1].dataValues);
    } else {
      res.status(200).send(event.dataValues);
    }

    if (!event) throw new Error('Event not found');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.MarkEventAsInterested = async (req, res) => {
  try {
    const { eventId } = req.params;
    const user = req.user;

    const event = await models.Event.findByPk(eventId);
    const currentPossibleAttendees = event.dataValues.possibleAttendees;

    if (currentPossibleAttendees.indexOf(user.userId) === -1) {
      currentPossibleAttendees.push(user.userId);
      const editedEvent = await models.Event.update(
        {
          possibleAttendees: currentPossibleAttendees,
        },
        { where: { eventId: eventId }, returning: true, plain: true },
      );
      res.status(200).send(editedEvent[1].dataValues);
    } else {
      res.status(200).send(event.dataValues);
    }

    if (!event) throw new Error('Event not found');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.UndoMarkEventAsInterested = async (req, res) => {
  try {
    const { eventId } = req.params;
    const user = req.user;

    const event = await models.Event.findByPk(eventId);
    const currentPossibleAttendees = event.dataValues.possibleAttendees;

    if (currentPossibleAttendees.indexOf(user.userId) !== -1) {
      const userIndex = currentPossibleAttendees.indexOf(user.userId);
      currentPossibleAttendees.splice(userIndex, 1);
      const editedEvent = await models.Event.update(
        {
          possibleAttendees: currentPossibleAttendees,
        },
        { where: { eventId: eventId }, returning: true, plain: true },
      );
      res.status(200).send(editedEvent[1].dataValues);
    } else {
      res.status(200).send(event.dataValues);
    }

    if (!event) throw new Error('Event not found');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
