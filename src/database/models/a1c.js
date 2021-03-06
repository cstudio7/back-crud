/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object} Comment model
 */
module.exports = (sequelize, DataTypes) => {
  const a1c = sequelize.define('a1c', {
    userId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.STRING,
    },
    readingValue: {
      type: DataTypes.BIGINT,
    },
    note: {
      type: DataTypes.STRING,
    },
    startTime: {
      type: DataTypes.TIME,
    }
  });
  a1c.associate = (models) => {
    a1c.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return a1c;
};
