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
    const newPOI = await createPOI(formattedAddress, latitude, longitude);
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
    });

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
