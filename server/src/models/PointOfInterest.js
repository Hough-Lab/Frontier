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
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    events: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
    reviews: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
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
