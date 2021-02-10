module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define("Chat", {
    chatId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    }
  });

  Chat.associate = (models) => {
    Chat.belongsToMany(models.User, { through: 'Chat_Users' });
  };
  return Chat;
};


