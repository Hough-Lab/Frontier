const uuid = require('uuid');
const models = require('../models').sequelize.models;

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
    } = req.body;

    const POIId = uuid.v4();
    const newPOI = await models.PointOfInterest.create({
      pointOfInterestId: POIId,
      formattedAddress,
      latitude,
      longitude,
    });

    console.log(newPOI);

    const eventId = uuid.v4();
    const user = req.user;

    const newEvent = await models.Event.create({
      eventId,
      pointOfInterestId: POIId,
      dateFrom,
      dateTo,
      title,
      description,
      maxCapacity,
      isPrivate,
      picture,
      UserId: user.id,
      createdBy: user.userId,
    });

    if (!newEvent) {
      throw new Error('could not add Event');
    } else {
      res.status(201).send(newEvent);
    }
  } catch (err) {
    console.error('THIS IS THE ERROR', err);
    res.status(500).send(err);
  }
};

exports.DeleteEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    await models.Event.destroy({
      where: { eventId },
    });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
