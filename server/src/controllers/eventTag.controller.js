const uuid = require('uuid');
const models = require('../models').sequelize.models;
const { Op } = require('sequelize');

exports.CreateEventTag = async (tags) => {
  console.log(tags)
  for (let tag of tags) {
    const eventTagId = uuid.v4();
    const tagExists = await models.EventTag.findAll({
      where: {
        tagName: tag
      }
    })
    if (tagExists.length === 0) {
      const newTag = await models.EventTag.create({
        eventTagId,
        tagName: tag,
      })
    }
  }
  return;
}

exports.GetEventsByTagId = async (req, res) => {
  console.log('testing')
  try {
    const { eventTag } = req.params;
    const events = await models.Event.findAll({
      where: {
        tags: {
          [Op.contains]: [eventTag]
        }
      }
    });
    console.log(events)
    res.status(200).send(events);
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

exports.GetAllEventTags = async (req, res) => {
  try {
    const result = await models.EventTag.findAll();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};