const uuid = require('uuid');
const models = require('../models').sequelize.models;



exports.PostReview = async (req, res) => {
  try {
    const {
      reviewId = uuid.v4(),
      title,
      description,
      rating,
      budgetLevel,
      safetyRating,
      safetyComment,
      picture,
    } = req.body;

    const newReview = await models.Review.create({
      reviewId,
      title,
      description,
      rating,
      budgetLevel,
      safetyRating,
      safetyComment,
      picture,
    })

    if (!newReview) throw new Error("could not add review");
    res.status(201).send(newReview);
  } catch (err) {
    res.status(500).send(err);
  }
}
//!below not working yet
exports.DeleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId
    await models.Review.destroy({ where: { reviewId, } });
    res.sendStatus(204);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};