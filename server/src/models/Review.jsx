module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Assignment", {
    reviewId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:, //???
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
      allowNull:,
      defaultValue:,
    },
  });

  //TODO - add assignments for Location-location, POI-POI, owner-User, tags - PlaceTag[]


  Assignment.associate = (models) => {
    .belongsTo(models.User);
    Review.hasOne(models.Location); //? the location of the point of interest --------------- Maybe not needed?
    Review.hasOne(models.PointOfInterest); //? the point of interest the review is for
    Review.hasOne(models.User); //? user who posts review
    Review.hasMany(models.ReviewTags) //? t
  };

  return Assignment;
};

: {
  type: DataTypes.,
  allowNull:,
  defaultValue:,
},
