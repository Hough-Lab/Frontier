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
      defaultValue: false,
    },
    certified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  User.associate = (models) => {
    // User.belongsTo(models.Course);
    User.hasMany(models.Location);
    User.hasMany(models.User);
    User.hasMany(models.Plan);
    User.hasMany(models.UserTag);
    User.hasMany(models.PointOfInterest);
    User.hasMany(models.Review);
    User.hasMany(models.Chat);
  };

  return User;
};
