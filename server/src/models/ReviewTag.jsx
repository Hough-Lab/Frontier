module.exports = (sequelize, DataTypes) => {
  const ReviewTag = sequelize.define("ReviewTag", {
    reviewTagId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  ReviewTag.associate = (models) => {
    ReviewTag.hasMany(models.Review); //? Reviews which feature this particular tag
  };
  return ReviewTag;
};

//TODO - add 'belongsTo' for this schema
