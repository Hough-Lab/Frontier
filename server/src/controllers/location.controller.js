const uuid = require('uuid');
const models = require('../models').sequelize.models;

exports.GetAllLocations = async (req, res) => {
  try {
    const locations = await models.Location.findAll();
    if (!locations) throw new Error('No locations found');
    res.status(200).send(locations);
  } catch (err) {
    res.status(500).send(err);
  }
};
