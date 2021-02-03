module.exports = (sequelize, DataTypes) => {
  const EventTag = sequelize.define("EventTag", {
    EventTagId: {
      type: DataTypes.UUID,
      allowNull: false,
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

