const uuid = require('uuid');
const models = require('../models').sequelize.models;

exports.CreateUserTag = async (tags) => {
  const userTagId = uuid.v4();
  tags.forEach(tag => {
    const newTag = await models.UserTag.create({
      userTagId,
      tagName: tag,
    })
    console.log(newTag);
  })
  return
}