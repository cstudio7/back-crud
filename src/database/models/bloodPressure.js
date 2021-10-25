/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const bloodPressure = sequelize.define(
    'bloodPressure',
    {
        userId: {
            type: DataTypes.UUID,
            onDelete: 'CASCADE',
        },
        type: {
            type: DataTypes.STRING,
        },
        readingValue: {
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.TIME,
        },
        desc: {
            type: DataTypes.STRING,
        }
    },
  );
    bloodPressure.associate = (models) => {
    // associations can be defined here
    bloodPressure.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return bloodPressure;
};
