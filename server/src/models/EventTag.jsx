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
    EventTag.hasMany(models.Event); //? Events which feature this particular tag
  };
  return EventTag;
};

//TODO - add 'belongsTo' for this schema
