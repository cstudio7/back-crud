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
    date: {
      type: DataTypes.DATE,
    },
    desc: {
      type: DataTypes.STRING,
    }
  });
  a1c.associate = (models) => {
    // a1c.belongsTo(models.user, {
    //   foreignKey: 'artisanId',
    //   onDelete: 'CASCADE',
    // });
  };
  return a1c;
};
