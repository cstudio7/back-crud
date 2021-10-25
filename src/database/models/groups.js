module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define(
    'group',
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
    },
    {}
  );
  return group;
};
