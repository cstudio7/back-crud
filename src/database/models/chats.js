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

  };
  return chat;
};
