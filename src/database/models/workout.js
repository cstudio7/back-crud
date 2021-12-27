module.exports = (sequelize, DataTypes) => {
  const workout = sequelize.define(
    'workout',
    {
      fullName: DataTypes.STRING,
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    workout.associate = (models) => {
    // associations can be defined here
    workout.belongsTo(models.user, {
        foreignKey: 'senderId',
        as: 'workout',
        onDelete: 'CASCADE',
    });
  };
  return workout;
};
