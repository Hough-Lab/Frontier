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

exports.GetAllPOI = async (req, res) => {
  try {
    const result = await models.PointOfInterest.findAll();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.GetPOIById = async (req, res) => {
  try {
    const { pointOfInterestId } = req.params;
    const poi = await models.PointOfInterest.findByPk(pointOfInterestId);
    console.log(poi)
    res.status(200).send(poi);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.GetEventsAndReviewsByPOI = async (req, res) => {
  try {
    const { pointOfInterestId } = req.params;
    const reviews = await models.Review.findAll({ where: { pointOfInterestId } });
    const events = await models.Event.findAll({ where: { pointOfInterestId } });
    const returnObject = {
      events,
      reviews
    }
    res.status(201).send(returnObject)
    } catch (err) {
      console.log(err)
    res.status(500).send(err);
  }
}

// exports.GetEventsByPOI = async (req, res) => {
//   try {
//     const { pointOfInterestId } = req.params;
//     const POI = await models.PointOfInterest.findByPk(pointOfInterestId);

//   } catch (err) {
//     res.status(500).send(err);
//   }
// }


// exports.GetReviewsByPOI = async (req, res) => {
//   try {
//     const { pointOfInterestId } = req.params;
//     const POI = await models.PointOfInterest.findByPk(pointOfInterestId);

//   } catch (err) {
//     res.status(500).send(err);
//   }
// }



