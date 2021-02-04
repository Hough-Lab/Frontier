module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    reviewId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: new Date().toISOString(), //? format is '2021-02-01T15:39:27.194Z'
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
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User);
    Review.hasOne(models.PointOfInterest); //! the location of the review - if it's close enough to an existing POI, will automatically be assigned to the exisitng POI
    Review.hasMany(models.ReviewTag); //? tags which feature in this review
  };
  return Review;
};
