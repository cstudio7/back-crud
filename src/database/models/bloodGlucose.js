/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const glucose = sequelize.define(
    'glucose',
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
        readingType: {
            type: DataTypes.STRING,
        },
        note: {
            type: DataTypes.STRING,
        }
    },
  );
    glucose.associate = (models) => {
    // associations can be defined here
    glucose.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return glucose;
};
