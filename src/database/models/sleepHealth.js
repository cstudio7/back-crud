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
    sleepHealth.belongsTo(models.user, {
        foreignKey: 'senderId',
        as: 'sleepHealth',
        onDelete: 'CASCADE',
    });
  };
  return sleepHealth;
};
