module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define("Location", {
    locationId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
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
    Location.belongsTo(models.PointOfInterest)
  };
  return Location;
};


