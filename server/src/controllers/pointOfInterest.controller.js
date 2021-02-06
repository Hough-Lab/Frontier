const uuid = require('uuid');
const models = require('../models').sequelize.models;

exports.createPOI = async (formattedAddress, latitude, longitude, user) => {

  const pointOfInterestId = uuid.v4();
  const locationId = uuid.v4();
  const UserUserId = user.UserUserId
  const searchPOI = await models.PointOfInterest.findAll({
    include: [
      {
        model: models.Location,
        where: {
            latitude: latitude,
            longitude: longitude,
        }
      }
    ]
  });


  if (searchPOI.length === 0) {
    const newPOI = await models.PointOfInterest.create({
      pointOfInterestId,
      formattedAddress,
      latitude,
      longitude,
      UserUserId
    });

    const newLocation = await models.Location.create({
      locationId,
      formattedAddress,
      latitude,
      longitude,
      PointOfInterestPointOfInterestId: newPOI.pointOfInterestId //
    });

    return newPOI
  } else {
    return searchPOI
  }
};

// Place id will be the Review ID or the Event ID. This function checks if there
// are any other events or reviews in a POI. If there are not, the POI will be deleted
// in order not to be an empty pinpoint. If there are, the POI won't be deleted.
exports.deletePOI = async (placeId) => {
  const allReviews = await models.review.findAll();
  const allEvents = await models.event.findAll();

  console.log(allReviews);
};

//! move to event and review

exports.CreatePOI = async (req, res) => {
  try {
    const {
      //? for poi
      pointOfInterestId,
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
    });

    const newLocation = await models.Location.create({
      locationId,
      formattedAddress,
      latitude,
      longitude,
      threeWords,
    });

    if (!newPOI && !newLocation)
      throw new Error('could not add new POI or location');
    if (newPOI && !newLocation)
      throw new Error('cound not add location to POI');
    if (!newPOI && newLocation) throw new Error('could not add POI');
    res.sendStatus(201).send(newPOI, newLocation);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.GetAllPOIs = async (req, res) => {
  try {
    const result = await models.PointOfInterest.findAll();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// exports.GetPOIById = async (req, res) => {
//   try {
//     const { pointOfInterestId } = req.params;
//     const POI = await models.POI.findByPk(pointOfInterestId);
//   }
// }
