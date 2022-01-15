module.exports = (sequelize, DataTypes) => {
  const excerciseMgt = sequelize.define(
    'excerciseMgt',
    {
      fullName: DataTypes.STRING,
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    excerciseMgt.associate = (models) => {
    // associations can be defined here

  };
  return excerciseMgt;
};
