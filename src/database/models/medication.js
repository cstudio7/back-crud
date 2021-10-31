/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object} Comment model
 */
module.exports = (sequelize, DataTypes) => {
  const medication = sequelize.define('medication', {
        userId: {
          type: DataTypes.UUID,
          onDelete: 'CASCADE',
        },
    type: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.STRING,
    },
    measuringUnit: {
      type: DataTypes.STRING,
    },
    avatar: DataTypes.STRING,
    avatarAwsDetails: DataTypes.JSONB,
  });
  medication.associate = (models) => {
    medication.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'medication',
      onDelete: 'CASCADE',
    });
  };
  return medication;
};
