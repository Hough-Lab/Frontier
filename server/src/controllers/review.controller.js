const uuid = require('uuid');
const models = require('../models').sequelize.models;
const { createPOI } = require('./pointOfInterest.controller');

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

    // const await createPOI(formattedAddress, latitude, longitude);
    const POIId = uuid.v4();
    const newPOI = await models.PointOfInterest.create({
      pointOfInterestId: POIId,
      formattedAddress,
      latitude,
      longitude,
    });
    const reviewId = uuid.v4();
    const user = req.user;
    console.log(newPOI);

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
    console.log(err);
    res.status(500).send(err);
  }
};

exports.GetReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await models.Review.findAll({
      where: { reviewId: reviewId },
    });
    console.log('review', review);
    if (!review) throw new Error('Review not found');
    res.status(200).send(review);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.GetAllReviews = async (req, res) => {
  try {
    const reviews = await models.Review.findAll();
    console.log(reviews);
    if (!reviews) throw new Error('No reviews found');
    res.status(200).send(reviews);
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
