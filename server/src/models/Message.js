module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    MessageId: {
      type: DataTypes.UUID,
      allowNull: false,
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
    Message.belongsToMany(models.Chat, { through: 'Message_Chats' }) //! not sure if necessary??
    Message.belongsTo(models.Chat);
    Message.hasOne(models.User); //? User who sent the message
  };
  return Message;
};


