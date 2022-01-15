module.exports = (sequelize, DataTypes) => {
  const sleepHealthMgt = sequelize.define(
    'sleepHealthMgt',
    {
      fullName: DataTypes.STRING,
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    sleepHealthMgt.associate = (models) => {
    // associations can be defined here
        sleepHealthMgt.belongsTo(models.user, {
        foreignKey: 'senderId',
        as: 'sleepHealth',
        onDelete: 'CASCADE',
    });
  };
  return sleepHealthMgt;
};
