module.exports = (sequelize, DataTypes) => {
  const excercise = sequelize.define(
    'excercise',
    {
      fullName: DataTypes.STRING,
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
