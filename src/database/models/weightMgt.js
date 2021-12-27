module.exports = (sequelize, DataTypes) => {
  const weightMgt = sequelize.define(
    'weightMgt',
    {
      fullName: DataTypes.STRING,
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    weightMgt.associate = (models) => {
    // associations can be defined here
    weightMgt.belongsTo(models.user, {
        foreignKey: 'senderId',
        as: 'weight',
        onDelete: 'CASCADE',
    });
  };
  return weightMgt;
};
