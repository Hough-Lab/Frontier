module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventId: {
      type: DataTypes.UUID,
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
      defaultValue: 'no description given',
    },
    maxCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '', //TODO insert stock 'no image' src/url here
    },
  });

  Event.associate = (models) => {
    Event.belongsToMany(models.User, { through: 'Event_Users' });
    Event.hasOne(models.PointOfInterest); //! the location of the review - if it's close enough to an existing POI, will automatically be assigned to the exisitng POI
    Event.hasMany(models.EventTag); //?
    // Event.belongsToMany(models.EventTag, { through: 'EventTag_Events' });
    // Event.belongsToMany(models.Plan, { through: 'Event_Plans' });
    // Event.hasOne(models.PointOfInterest); //? the point of interest the event is for
    // Event.hasMany(models.User); //? user who posts the event __________ Users[] interested in the event __________ Users[] going to the event
  };

  return Event;
};
