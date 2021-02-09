const uuid = require('uuid');
const models = require('../models').sequelize.models;
const { createPOI } = require('./pointOfInterest.controller');
const { CreateReviewTag } = require('./reviewTag.controller');

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
      tags,
    } = req.body;

    const user = req.user;

    CreateReviewTag(tags);
    const newPOI = await createPOI(formattedAddress, latitude, longitude);
    const reviewId = uuid.v4();

    let pointOfInterestId;

    if (newPOI.length >= 1) {
      pointOfInterestId = newPOI[0].pointOfInterestId;
    } else {
      pointOfInterestId = newPOI.pointOfInterestId;
    }

    const newReview = await models.Review.create({
      reviewId,
      pointOfInterestId,
      title,
      description,
      rating,
      budgetLevel,
      safetyRating,
      safetyComment,
      picture,
      createdBy: user.userId,
      PointOfInterestPointOfInterestId: newPOI.pointOfInterestId,
      tags,
    });

    const poiToUpdate = await models.PointOfInterest.findByPk( pointOfInterestId );
    if (!poiToUpdate.reviews) {
      poiToUpdate.reviews = [newReview]
    } else {
      console.log(poiToUpdate.reviews);
      poiToUpdate.reviews.push('hello!')
    }
    await poiToUpdate.save();

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
    const review = await models.Review.findByPk(reviewId);
    if (!review) throw new Error('Review not found');
    res.status(200).send(review);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.GetAllReviews = async (req, res) => {
  try {
    const review = await models.Review.findAll();
    if (!review) throw new Error('No review found');
    res.status(200).send(review);
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

exports.GetEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await models.Event.findAll({
      where: { eventId: eventId },
    });
    if (!event) throw new Error('event not found');
    res.status(200).send(event);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.LikeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const user = req.user;

    const review = await models.Review.findByPk(reviewId);
    const currentLikers = review.dataValues.likedBy;

    if (currentLikers.indexOf(user.userId) === -1) {
      const emptyValue = currentLikers.indexOf('');
      emptyValue && currentLikers.splice(emptyValue, 1);
      currentLikers.push(user.userId);
      const editedReview = await models.Review.update(
        {
          likedBy: currentLikers,
        },
        { where: { reviewId: reviewId }, returning: true, plain: true },
      );
      res.status(200).send(editedReview[1].dataValues);
    } else {
      res.status(200).send(review.dataValues);
    }

    if (!review) throw new Error('Event not found');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.UndoLikeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const user = req.user;

    const review = await models.Review.findByPk(reviewId);
    const currentLikers = review.dataValues.likedBy;

    if (currentLikers.indexOf(user.userId) !== -1) {
      const userIndex = currentLikers.indexOf(user.userId);
      currentLikers.splice(userIndex, 1);
      const editedReview = await models.Review.update(
        {
          likedBy: currentLikers,
        },
        { where: { reviewId: reviewId }, returning: true, plain: true },
      );
      res.status(200).send(editedReview[1].dataValues);
    } else {
      res.status(200).send(review.dataValues);
    }

    if (!review) throw new Error('Event not found');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.DislikeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const user = req.user;

    const review = await models.Review.findByPk(reviewId);
    const currentDislikers = review.dataValues.dislikedBy;

    if (currentDislikers.indexOf(user.userId) === -1) {
      const emptyValue = currentDislikers.indexOf('');
      emptyValue && currentDislikers.splice(emptyValue, 1);
      currentDislikers.push(user.userId);
      const editedReview = await models.Review.update(
        {
          dislikedBy: currentDislikers,
        },
        { where: { reviewId: reviewId }, returning: true, plain: true },
      );
      res.status(200).send(editedReview[1].dataValues);
    } else {
      res.status(200).send(review.dataValues);
    }

    if (!review) throw new Error('Event not found');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.UndoDislikeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const user = req.user;

    const review = await models.Review.findByPk(reviewId);
    const currentDislikers = review.dataValues.dislikedBy;

    if (currentDislikers.indexOf(user.userId) !== -1) {
      const userIndex = currentDislikers.indexOf(user.userId);
      currentDislikers.splice(userIndex, 1);
      const editedReview = await models.Review.update(
        {
          dislikedBy: currentDislikers,
        },
        { where: { reviewId: reviewId }, returning: true, plain: true },
      );
      res.status(200).send(editedReview[1].dataValues);
    } else {
      res.status(200).send(review.dataValues);
    }

    if (!review) throw new Error('Event not found');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
