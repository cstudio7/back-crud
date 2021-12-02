module.exports = (sequelize, DataTypes) => {
  const hypertensionMgt = sequelize.define(
    'hypertensionMgt',
    {
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    hypertensionMgt.associate = (models) => {
    // associations can be defined here
    hypertensionMgt.belongsTo(models.user, {
        foreignKey: 'senderId',
        as: 'hypertensionMgt',
        onDelete: 'CASCADE',
    });
  };
  return hypertensionMgt;
};
