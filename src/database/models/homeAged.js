module.exports = (sequelize, DataTypes) => {
  const homeAged = sequelize.define(
    'homeAged',
    {
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    homeAged.associate = (models) => {
    // associations can be defined here

  };
  return homeAged;
};
