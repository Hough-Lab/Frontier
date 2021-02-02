module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define("Plan", {
    PlanId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'No description given'
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Plan.associate = (models) => {
    Plan.belongsTo(models.User);
    Plan.hasOne(models.PointOfInterest); //? location of the plan
    Plan.hasOne(models.Event) //? optional event for the plan
  };
  return Plan;
};


