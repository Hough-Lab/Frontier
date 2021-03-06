module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    reviewId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    pointOfInterestId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    budgetLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'no description given',
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    safetyRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    safetyComment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    likedBy: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    dislikedBy: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User);
    Review.hasMany(models.ReviewTag); //? tags which feature in this review
  };
  return Review;
};
