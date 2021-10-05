module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      firstName: { type: DataTypes.STRING, allowNull: true },
      lastName: { type: DataTypes.STRING, allowNull: true },
      phoneNumber: { type: DataTypes.BIGINT, allowNull: true, unique: true },
      email: { type: DataTypes.STRING, allowNull: false },
      avatar: DataTypes.STRING,
      avatarAwsDetails: DataTypes.JSONB,
      gender: { type: DataTypes.STRING, allowNull: true },
      password: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: true },
      authType: { type: DataTypes.STRING, allowNull: true },
      isVerified: { type: DataTypes.BOOLEAN, allowNull: false }
    },
    {}
  );
  user.associate = (models) => {
    // association goes here
  };
  return user;
};
