module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    pointOfInterestId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateFrom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No description given.',
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    maxCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '', //TODO insert stock 'no image' src/url here
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User);
    Event.hasMany(models.EventTag);
  };
  return Event;
};
