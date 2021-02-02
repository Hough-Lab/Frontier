module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define("Location", {
    LocationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    formattedAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false,
    }
  });


  //!below not finished
  Location.associate = (models) => {
    Location.hasOne(models.Location); //? location of the POI
    Location.hasMany(models.Event); //? list of events at the POI
    Location.hasMany(models.Review); //? list of revies for the POI
    Location.hasMany(models.ReviewTags); //? POI tags extracted from the review tags for this poi
    Location.hasMany(models.User); //? users who favorite this POI
  };
  return Location;
};


