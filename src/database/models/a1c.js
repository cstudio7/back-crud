/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object} Comment model
 */
module.exports = (sequelize, DataTypes) => {
  const a1c = sequelize.define('a1c', {
    type: {
      type: DataTypes.STRING,
    },
    readingValue: {
      type: DataTypes.BIGINT,
    },
    note: {
      type: DataTypes.STRING,
    }
  });
  a1c.associate = (models) => {
    a1c.belongsTo(models.user, {
      foreignKey: 'userIdId',
      onDelete: 'CASCADE',
    });
  };
  return a1c;
};
