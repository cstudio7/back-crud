module.exports = (sequelize, DataTypes) => {
  const workingHome = sequelize.define(
    'workingHome',
    {
      fullName: DataTypes.STRING,
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    workingHome.associate = (models) => {
    // associations can be defined here
        workingHome.belongsTo(models.user, {
        foreignKey: 'senderId',
        as: 'workHome',
        onDelete: 'CASCADE',
    });
  };
  return workingHome;
};
