/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object} Comment model
 */
module.exports = (sequelize, DataTypes) => {
  const weight = sequelize.define('weight', {
    type: {
      type: DataTypes.STRING,
    },
    readingValue: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
    },
    note: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
    }
  });
  weight.associate = (models) => {
    weight.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'weight',
      onDelete: 'CASCADE',
    });
  };
  return weight;
};
