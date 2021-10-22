module.exports = (sequelize, DataTypes) => {
  const workout = sequelize.define(
    'workout',
    {
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    workout.associate = (models) => {
    // associations can be defined here

  };
  return workout;
};
