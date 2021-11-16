/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object} Comment model
 */
module.exports = (sequelize, DataTypes) => {
  const inspiration = sequelize.define('inspiration', {
    category: {
      type: DataTypes.STRING,
    },
    details: {
      type: DataTypes.JSONB,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    avatarAwsDetails: {
      type: DataTypes.JSONB,
    }
  });
  inspiration.associate = (models) => {

  };
  return inspiration;
};
