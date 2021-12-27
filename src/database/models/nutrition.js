module.exports = (sequelize, DataTypes) => {
  const nutritionMgt = sequelize.define(
    'nutritionMgt',
    {
      fullName: DataTypes.STRING,
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    nutritionMgt.associate = (models) => {
    // associations can be defined here
    nutritionMgt.belongsTo(models.user, {
        foreignKey: 'senderId',
        as: 'nutrition',
        onDelete: 'CASCADE',
    });
  };
  return nutritionMgt;
};
