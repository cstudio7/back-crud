module.exports = (sequelize, DataTypes) => {
  const homeKidMgt = sequelize.define(
    'homeKidMgt',
    {
      fullName: DataTypes.STRING,
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    homeKidMgt.associate = (models) => {
    // associations can be defined here
        homeKidMgt.belongsTo(models.user, {
        foreignKey: 'senderId',
        as: 'homeKid',
        onDelete: 'CASCADE',
    });
  };
  return homeKidMgt;
};
