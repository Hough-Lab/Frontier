const uuid = require('uuid');
const models = require('../models').sequelize.models;
const { deletePOI } = require('./pointOfInterest.controller');

exports.PostReview = async (req, res) => {
  try {
    const {
      formattedAddress,
      latitude,
      longitude,
      title,
      description,
      rating,
      budgetLevel,
      safetyRating,
      safetyComment,
      picture,
    } = req.body;

    await createPOI(formattedAddress, latitude, longitude);
    const reviewId = uuid.v4();
    const user = req.user;

    const newReview = await models.Review.create({
      reviewId,
      pointOfInterestId: POIId,
      title,
      description,
      rating,
      budgetLevel,
      safetyRating,
      safetyComment,
      picture,
      createdBy: user.userId,
      UserId: user.id,
    });

    if (!newReview) {
      throw new Error('could not add review');
    } else {
      res.status(201).send(newReview);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//!below not working yet
exports.DeleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    await deletePOI(reviewId);
    await models.Review.destroy({ where: { reviewId } });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
