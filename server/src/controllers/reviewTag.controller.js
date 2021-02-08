const uuid = require('uuid');
const models = require('../models').sequelize.models;

exports.CreateReviewTag = async (tags) => {
  console.log(tags)
  for (let tag of tags) {
    const reviewTagId = uuid.v4();
    const tagExists = await models.ReviewTag.findAll({
      where: {
        tagName: tag
      }
    })
    if (tagExists.length === 0) {
      const newTag = await models.ReviewTag.create({
        reviewTagId,
        tagName: tag,
      })
    }
  }
  return;
}

//! not working yet
exports.GetReviewsByTagId = async (req, res) => {
  try {
    const { reviewTag } = req.params;
    const reviews = await models.Review.findAll({
      where: {
        tagName: [reviewTag]
      }
    });
    res.status(200).send(reviews);
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

exports.GetAllReviewTags = async (req, res) => {
  try {
    const result = await models.ReviewTag.findAll();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
