module.exports = (sequelize, DataTypes) => {
  const ReviewTag = sequelize.define("ReviewTag", {
    reviewTagId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  ReviewTag.associate = (models) => {
    ReviewTag.belongsToMany(models.Review, { through: 'ReviewTag_Reviews' })
  };
  return ReviewTag;
};

