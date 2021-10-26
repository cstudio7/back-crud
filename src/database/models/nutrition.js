module.exports = (sequelize, DataTypes) => {
  const nutritionMgt = sequelize.define(
    'nutritionMgt',
    {
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    nutritionMgt.associate = (models) => {
    // associations can be defined here

  };
  return nutritionMgt;
};
