module.exports = (sequelize, DataTypes) => {
  const PointOfInterest = sequelize.define("PointOfInterest", {
    pointOfInterestId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    formattedAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  PointOfInterest.associate = (models) => {
    PointOfInterest.hasOne(models.Location); //? location of the POI
    PointOfInterest.hasMany(models.Event); //? list of events at the POI
    PointOfInterest.hasMany(models.Review); //? list of revies for the POI
    PointOfInterest.hasMany(models.ReviewTags); //? POI tags extracted from the review tags for this poi
    PointOfInterest.hasMany(models.User); //? users who favorite this POI
  };
  return PointOfInterest;
};











