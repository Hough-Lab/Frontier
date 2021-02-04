const uuid = require('uuid');
const models = require('../models').sequelize.models;

exports.PostEvent = async (req, res) => {
  try {
    const {
      EventId = uuid.v4(),
      dateFrom,
      dateTo,
      title,
      description,
      maxCapacity,
      private,
      picture,
    } = req.body;

    const newEvent = await models.Event.create({
      EventId,
      dateFrom,
      dateTo,
      title,
      description,
      maxCapacity,
      private,
      picture,
    })

    if (!newEvent) throw new Error("could not add Event");
    res.status(201).send(newEvent);
  } catch (err) {
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
    console.log(err)
    res.status(500).send(err);
  }
};