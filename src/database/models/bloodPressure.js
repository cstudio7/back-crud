/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const blood = sequelize.define(
    'blood',
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
        desc: {
            type: DataTypes.STRING,
        }
    },
  );
    blood.associate = (models) => {
    // associations can be defined here
    blood.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return blood;
};
