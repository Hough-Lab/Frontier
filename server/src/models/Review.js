module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Assignment", {
    fileData: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dismissed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
//~_____________________________________________________reference above____________________________________________________________
    reviewId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:, //???
    },
    budgetLevel: {
      type: DataTypes.INT,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'no description given',
    },
    rating: {
      type: DataTypes.INT,
      allowNull: false,
    },
    safetyRating: {
      type: DataTypes.INT,
      allowNull: false,
    },
    safetyComment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull:,
      defaultValue:,
    },

  });

  //TODO - add assignments for Location-location, POI-POI, owner-User, tags - PlaceTag[]


  Assignment.associate = (models) => {
    .belongsTo(models.User);
    Review.hasOne(models.Location);
    Review.hasMany(models.)
  };

  return Assignment;
};

: {
  type: DataTypes.,
  allowNull:,
  defaultValue:,
},
