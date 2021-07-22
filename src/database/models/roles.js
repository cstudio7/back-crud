module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    'role',
    {
      name: DataTypes.STRING,
    },
    {}
  );
  return role;
};
