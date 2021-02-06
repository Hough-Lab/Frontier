module.exports = (sequelize, DataTypes) => {
  const PointOfInterest = sequelize.define('PointOfInterest', {
    pointOfInterestId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    formattedAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  PointOfInterest.associate = (models) => {
    PointOfInterest.belongsToMany(models.User, {
      through: 'PointOfInterest_FavoritedBy',
    });
    PointOfInterest.belongsToMany(models.Review, {
      through: 'PointOfInterest_Reviews',
    });
    PointOfInterest.belongsToMany(models.Event, {
      through: 'PointOfInterest_Events',
    });
    PointOfInterest.hasOne(models.Location); //? location of the POI
  };
  return PointOfInterest;
};
