module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      firstName: { type: DataTypes.STRING, allowNull: true },
      lastName: { type: DataTypes.STRING, allowNull: true },
      phoneNumber: { type: DataTypes.BIGINT, allowNull: true, unique: true },
      personalDetails: { type: DataTypes.JSONB},
      avatar: DataTypes.STRING,
      avatarAwsDetails: DataTypes.JSONB,
      hypertensionProfile: { type: DataTypes.JSONB},
      diabetesProfile: { type: DataTypes.JSONB},
      lifestyleProfile: { type: DataTypes.JSONB},
      email: { type: DataTypes.STRING, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: true },
      password: { type: DataTypes.STRING, allowNull: false },
      code: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: true },
      authType: { type: DataTypes.STRING, allowNull: true },
      isVerified: { type: DataTypes.BOOLEAN, allowNull: false },
      isBlocked: { type: DataTypes.BOOLEAN, allowNull: true },
    },
    {}
  );
  user.associate = (models) => {
    // association goes here
  };
  return user;
};
