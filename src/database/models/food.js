/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object} Comment model
 */
module.exports = (sequelize, DataTypes) => {
  const foods = sequelize.define('fud', {
    userId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING,
    },
    addRecipe: {
      type: DataTypes.ARRAY(DataTypes.JSONB ),
    },
    desc: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    avatarAwsDetails: {
      type: DataTypes.JSONB,
    },
    note: {
      type: DataTypes.STRING,
    },
  });
  foods.associate = (models) => {
    foods.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return foods;
};
