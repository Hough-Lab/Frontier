module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define("Chat", {
    ChatId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  });

  Chat.associate = (models) => {
    Chat.belongsToMany(models.User, { through: 'Chat_Users' });
    Chat.hasMany(models.User); //? List of users in the chat
    Chat.hasMany(models.Message); //?
  };
  return Chat;
};


