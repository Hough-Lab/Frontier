module.exports = (sequelize, DataTypes) => {
  const UserTag = sequelize.define("UserTag", {
    userTagId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  UserTag.associate = (models) => {
    UserTag.hasMany(models.User); //? users who define this tag as an 'interest' in their profile
  };
  return UserTag;
};

//TODO - add 'belongsTo' for this schema
