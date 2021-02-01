module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
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
      type: DataTypes.INT,
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
      type: DataTypes.INT,
      allowNull: false,
    },
    safetyRating: {
      type: DataTypes.INT,
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
    Review.hasOne(models.Location); //! the location of the review - if it's close enough to an existing POI, will automatically be assigned to the exisitng POI
    Review.hasOne(models.PointOfInterest); //? the point of interest the review is for
    Review.hasOne(models.User); //? user who posts review
    Review.hasMany(models.ReviewTags) //? tags which feature in this review
  };
  return Review;
};