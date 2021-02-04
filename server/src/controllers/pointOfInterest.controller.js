const uuid = require('uuid');
const models = require('../models').sequelize.models;

exports.createPOI = async (formattedAddress, latitude, longitude) => {
  const POIId = uuid.v4();
  const newPOI = await models.PointOfInterest.create({
    pointOfInterestId: POIId,
    formattedAddress,
    latitude,
    longitude,
  });
};

// Place id will be the Review ID or the Event ID. This function checks if there
// are any other events or reviews in a POI. If there are not, the POI will be deleted
// in order not to be an empty pinpoint. If there are, the POI won't be deleted.
exports.deletePOI = async (placeId) => {
  const allReviews = await models.review.findAll();
  const allEvents = await models.event.findAll();

  console.log(allReviews);
};
