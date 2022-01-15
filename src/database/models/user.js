module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      firstName: { type: DataTypes.STRING, allowNull: true },
      lastName: { type: DataTypes.STRING, allowNull: true },
      phoneNumber: { type: DataTypes.BIGINT, allowNull: true, unique: true },
      email: { type: DataTypes.STRING, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: true },
      dob: DataTypes.DATE,
      race: DataTypes.STRING,
      avatar: DataTypes.STRING,
      group:  { type: DataTypes.ARRAY(DataTypes.STRING)},
      avatarAwsDetails: DataTypes.JSONB,
      emergencyContact: DataTypes.STRING,
      manage: DataTypes.STRING,
      typeOfDiabetes: DataTypes.STRING,
      typeOfHypertension: DataTypes.STRING,
      a1c: DataTypes.STRING,
      bloodPressure: DataTypes.STRING,
      bloodGlucose: DataTypes.STRING,
      bloodPressureMin: DataTypes.STRING,
      bloodPressureMax: DataTypes.STRING,
      bloodGlucoseMin: DataTypes.STRING,
      bloodGlucoseMax: DataTypes.STRING,
      weight: DataTypes.STRING,
      height: DataTypes.STRING,
      diagnosedDate: DataTypes.DATE,
      password: { type: DataTypes.STRING, allowNull: false },
      token: { type: DataTypes.STRING(500), allowNull: true },
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
      user.hasOne(models.foodLib, {
          foreignKey: 'userId',
          as: 'foodLibrary',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      user.hasOne(models.medLib, {
          foreignKey: 'userId',
          as: 'medLibrary',
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
          as: 'userWeight',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      user.hasMany(models.a1c, {
          foreignKey: 'userId',
          as: 'A1c',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      user.hasMany(models.goal, {
          foreignKey: 'userId',
          as: 'goal',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      user.hasMany(models.fud, {
          foreignKey: 'userId',
          as: 'foods',
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
          as: 'bloodPressures',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      user.hasMany(models.glucose, {
          foreignKey: 'userId',
          as: 'glucose',
          onDelete: 'cascade',
          onUpdate: 'cascade',
      });
      // user.hasOne(models.nutritionMgt, {
      //     foreignKey: 'senderId',
      //     as: 'nutrition',
      //     onDelete: 'cascade',
      //     onUpdate: 'cascade',
      // });
      // user.hasOne(models.hypertensionMgt, {
      //     foreignKey: 'senderId',
      //     as: 'hypertension',
      //     onDelete: 'cascade',
      //     onUpdate: 'cascade',
      // });
      // user.hasOne(models.excercise, {
      //     foreignKey: 'senderId',
      //     as: 'excercise',
      //     onDelete: 'cascade',
      //     onUpdate: 'cascade',
      // });
      // user.hasOne(models.stressMgt, {
      //     foreignKey: 'senderId',
      //     as: 'stress',
      //     onDelete: 'cascade',
      //     onUpdate: 'cascade',
      // });
  };
  return user;
};
