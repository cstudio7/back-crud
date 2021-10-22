/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object} Comment model
 */
module.exports = (sequelize, DataTypes) => {
  const inspiration = sequelize.define('inspiration', {
    background: {
      type: DataTypes.STRING,
    },
    condition: {
      type: DataTypes.STRING,
    },
    icon: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    avatarAwsDetails: {
      type: DataTypes.JSONB,
    },
    quote: {
      type: DataTypes.STRING,
    }
  });
  inspiration.associate = (models) => {

  };
  return inspiration;
};
