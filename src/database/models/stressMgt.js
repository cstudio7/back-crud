module.exports = (sequelize, DataTypes) => {
  const stressMgt = sequelize.define(
    'stressMgt',
    {
      groupName: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    stressMgt.associate = (models) => {
    // associations can be defined here
    stressMgt.belongsTo(models.user, {
    foreignKey: 'senderId',
    as: 'stress',
    onDelete: 'CASCADE',
    });
  };
  return stressMgt;
};
