module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define(
    'chat',
    {
      message: DataTypes.STRING,
      receiverId: DataTypes.UUID,
      senderId: DataTypes.UUID,
    },
    {}
  );
  chat.associate = (models) => {
    // associations can be defined here
      chat.belongsTo(
          models.user,
          { foreignKey: 'receiverId' },
          { onDelete: 'cascade' },
          { onUpdate: 'cascade' }
      );
      chat.belongsTo(
          models.user,
          { foreignKey: 'senderId' },
          { onDelete: 'cascade' },
          { onUpdate: 'cascade' }
      );
  };
  return chat;
};
