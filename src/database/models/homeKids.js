module.exports = (sequelize, DataTypes) => {
  const homeKid = sequelize.define(
    'homeKid',
    {
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    homeKid.associate = (models) => {
    // associations can be defined here
    homeKid.belongsTo(models.user, {
        foreignKey: 'senderId',
        as: 'homeKid',
        onDelete: 'CASCADE',
    });
  };
  return homeKid;
};
