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
    time: {
      type: DataTypes.TIME,
    },
    desc: {
      type: DataTypes.STRING,
    }
  });
  weight.associate = (models) => {
    // weight.belongsTo(models.user, {
    //   foreignKey: 'artisanId',
    //   onDelete: 'CASCADE',
    // });
  };
  return weight;
};
