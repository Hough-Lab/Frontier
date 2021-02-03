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
    },
    threeWords: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Location.associate = (models) => {
    Location.belongsToMany(models.Plan, { through: 'Location_Plans' })
    Location.belongsToMany(models.PointOfInterest, { through: 'Location_PointsOfInterest' }) //! NOTE the 'S' in Point's'OfInterest
  };
  return Location;
};


