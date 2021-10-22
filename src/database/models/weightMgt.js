module.exports = (sequelize, DataTypes) => {
  const weightMgt = sequelize.define(
    'weightMgt',
    {
      message: DataTypes.STRING,
      senderId: DataTypes.UUID,
    },
    {}
  );
    weightMgt.associate = (models) => {
    // associations can be defined here

  };
  return weightMgt;
};
