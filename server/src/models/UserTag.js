module.exports = (sequelize, DataTypes) => {
  const UserTag = sequelize.define("UserTag", {
    userTagId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  UserTag.associate = (models) => {
    UserTag.belongsToMany(models.User, { through: 'UserTag_Users' });
  };
  return UserTag;
};


