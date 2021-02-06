module.exports = (sequelize, DataTypes) => {
  const EventTag = sequelize.define("EventTag", {
    eventTagId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  EventTag.associate = (models) => {
    EventTag.belongsToMany(models.Event, { through: 'EventTag_Events' });
  };
  return EventTag;
};

