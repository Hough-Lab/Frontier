const uuid = require('uuid');
const models = require('../models').sequelize.models;


//! move to event and review

exports.CreatePOI = async (req, res) => {
  try {
    const {
      //? for poi
      pointOfInterestId = uuid.v4(),
      formattedAddress,
      //? for location
      locationId = uuid.v4(),
      latitude,
      longitude,
      threeWords,
    } = req.body;

    const newPOI = await models.PointOfInterest.create({
      pointOfInterestId,
      formattedAddress,
    })

    const newLocation = await models.Location.create({
      locationId,
      formattedAddress,
      latitude,
      longitude,
      threeWords,
    })

    if (!newPOI && !newLocation) throw new Error('could not add new POI or location')
    if (newPOI && !newLocation) throw new Error ('cound not add location to POI')
    if (!newPOI && newLocation) throw new Error ('could not add POI')
    res.sendStatus(201).send(newPOI, newLocation);
  } catch (err) {
    res.status(500).send(err);
  };
}


exports.GetAllPOIs = async (req, res) => {
  try {
    const result = await models.PointOfInterest.findAll();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

// exports.GetPOIById = async (req, res) => {
//   try {
//     const { pointOfInterestId } = req.params;
//     const POI = await models.POI.findByPk(pointOfInterestId);
//   }
// }







































































































