module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      firstName: { type: DataTypes.STRING, allowNull: true },
      lastName: { type: DataTypes.STRING, allowNull: true },
      phoneNumber: { type: DataTypes.BIGINT, allowNull: true, unique: true },
      email: { type: DataTypes.STRING, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: true },
      age: DataTypes.STRING,
      race: DataTypes.STRING,
      avatar: DataTypes.STRING,
      avatarAwsDetails: DataTypes.JSONB,
      emergencyContact: DataTypes.JSONB,
      emergencyMail: { type: DataTypes.JSONB},
      diabetesProfile: { type: DataTypes.JSONB},
      hypertensionProfile: { type: DataTypes.JSONB},
      lifestyleProfile: { type: DataTypes.JSONB},
      password: { type: DataTypes.STRING, allowNull: false },
      code: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: true },
      authType: { type: DataTypes.STRING, allowNull: true },
      isVerified: { type: DataTypes.BOOLEAN, allowNull: false }
    },
    {}
  );
  user.associate = (models) => {
    // association goes here
      user.hasOne(models.onBoarding, {
          foreignKey: 'userId',
          as: 'onBoarding',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      user.hasOne(models.foodLibrary, {
          foreignKey: 'userId',
          as: 'foodLibrary',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      user.hasMany(models.activity, {
          foreignKey: 'userId',
          as: 'activities',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      user.hasMany(models.weight, {
          foreignKey: 'userId',
          as: 'weight',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      user.hasMany(models.a1c, {
          foreignKey: 'userId',
          as: 'a1c',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      user.hasMany(models.goal, {
          foreignKey: 'userId',
          as: 'goal',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      user.hasMany(models.food, {
          foreignKey: 'userId',
          as: 'food',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      user.hasMany(models.medication, {
          foreignKey: 'userId',
          as: 'medication',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      user.hasMany(models.blood, {
          foreignKey: 'userId',
          as: 'bloodPressure',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
  };
  return user;
};
