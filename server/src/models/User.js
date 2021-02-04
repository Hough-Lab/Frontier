module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    isBusiness: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastSeen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verifications: {
      type: DataTypes.INTEGER,
    },
    certified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Event);
    User.hasMany(models.Review);
    User.hasMany(models.UserTag);
    User.hasMany(models.PointOfInterest);
    User.hasMany(models.Plan);
    User.hasMany(models.Chat);
    // User.belongsTo(models.Event);
    // User.belongsToMany(models.Event, { through: 'User_Events_Attending'});
    // User.belongsTo(models.Review);
    // User.belongsToMany(models.Review, { through: 'User_Reviews'});
    // User.belongsToMany(models.Event, { through: 'User_Events_Interested'});
    // User.belongsToMany(models.UserTag, { through: 'User_UserTags'});
    // User.hasMany(models.PointOfInterest);
  };

  return User;
};
