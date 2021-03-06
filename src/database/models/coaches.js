module.exports = (sequelize, DataTypes) => {
  const coach = sequelize.define(
    'coach',
    {
      firstName: { type: DataTypes.STRING, allowNull: true },
      lastName: { type: DataTypes.STRING, allowNull: true },
      bio: { type: DataTypes.STRING, allowNull: true },
        code: { type: DataTypes.STRING, allowNull: false },
      phoneNumber: { type: DataTypes.BIGINT, allowNull: true, unique: true },
      email: { type: DataTypes.STRING, allowNull: false },
      avatar: DataTypes.STRING,
      avatarAwsDetails: DataTypes.JSONB,
      gender: { type: DataTypes.STRING, allowNull: true },
      password: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING },
      country: { type: DataTypes.STRING, allowNull: true },
      authType: { type: DataTypes.STRING, allowNull: true },
      isVerified: { type: DataTypes.BOOLEAN, allowNull: false }
    },
    {}
  );
    coach.associate = (models) => {
    // association goes here
  };
  return coach;
};
