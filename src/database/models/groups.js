module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define(
    'role',
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
    },
    {}
  );
  return group;
};
