module.exports = (sequelize, DataTypes) => {
  const workHome = sequelize.define(
    'workHome',
    {
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    workHome.associate = (models) => {
    // associations can be defined here
    workHome.belongsTo(models.user, {
        foreignKey: 'senderId',
        as: 'workHome',
        onDelete: 'CASCADE',
    });
  };
  return workHome;
};
