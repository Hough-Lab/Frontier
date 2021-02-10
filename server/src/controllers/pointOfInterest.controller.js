const uuid = require('uuid');
const models = require('../models').sequelize.models;

exports.createPOI = async (formattedAddress, latitude, longitude, tags) => {
  const pointOfInterestId = uuid.v4();
  const locationId = uuid.v4();
  const searchPOI = await models.PointOfInterest.findAll({
    include: [
      {
        model: models.Location,
        where: {
          formattedAddress: formattedAddress,
          latitude: latitude,
          longitude: longitude,
        },
      },
    ],
  });
  console.log('thetruth', searchPOI.length === 0);
  if (searchPOI.length === 0) {
    const newPOI = await models.PointOfInterest.create({
      pointOfInterestId,
      formattedAddress,
      latitude,
      longitude,
      tags: tags,
    });

    const newLocation = await models.Location.create({
      locationId,
      formattedAddress,
      latitude,
      longitude,
      PointOfInterestPointOfInterestId: newPOI.pointOfInterestId, //
    });

    return newPOI;
  } else {
    const oldTags = searchPOI[0].dataValues.tags;
    for (let tag in tags) {
      console.log('one', tag);
      if (oldTags.indexOf(tags[tag]) === -1) {
        oldTags.push(tags[tag]);
      }
    }
    console.log('oldTags', oldTags);
    const editedPOI = await models.PointOfInterest.update(
      {
        tags: oldTags,
      },
      {
        where: { pointOfInterestId: searchPOI[0].dataValues.pointOfInterestId },
        returning: true,
        plain: true,
      },
    );
    return editedPOI[1].dataValues;
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
    const POI = await models.PointOfInterest.findByPk(pointOfInterestId);
    res.status(200).send(POI);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.GetEventsAndReviewsByPOI = async (req, res) => {
  try {
    const { pointOfInterestId } = req.params;
    const POI = await models.PointOfInterest.findByPk(pointOfInterestId);
    const reviews = await models.Review.findAll({
      where: { pointOfInterestId },
    });
    const events = await models.Event.findAll({ where: { pointOfInterestId } });
    const returnObject = {
      pointOfInterestId: POI.pointOfInterestId,
      formattedAddress: POI.formattedAddress,
      latitude: POI.latitude,
      longitude: POI.longitude,
      events,
      reviews,
    };
    res.status(200).send(returnObject);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

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
