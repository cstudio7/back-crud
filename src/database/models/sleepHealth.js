module.exports = (sequelize, DataTypes) => {
  const sleepHealth = sequelize.define(
    'sleepHealth',
    {
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    sleepHealth.associate = (models) => {
    // associations can be defined here

  };
  return sleepHealth;
};
