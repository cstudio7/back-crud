module.exports = (sequelize, DataTypes) => {
  const excercise = sequelize.define(
    'excercise',
    {
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    excercise.associate = (models) => {
    // associations can be defined here

  };
  return excercise;
};
