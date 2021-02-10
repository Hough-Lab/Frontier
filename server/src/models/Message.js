module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    messageId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    sentAt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: new Date().toISOString(), //? format is '2021-02-01T15:39:27.194Z'
    },
    messageBody: {
      type: DataTypes.STRING,
      allownull: false,
    }
  });

  //!below not finished
  Message.associate = (models) => {
    Message.belongsTo(models.Chat);
  };
  return Message;
};


