module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define("Chat", {
    chatId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  });

  Chat.associate = (models) => {
    Chat.belongsToMany(models.User, { through: 'Chat_Users' });
  };
  return Chat;
};


