/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object} Comment model
 */
module.exports = (sequelize, DataTypes) => {
  const food = sequelize.define('food', {
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
    date: {
      type: DataTypes.DATE,
    },
    time: {
      type: DataTypes.DATE,
    },
    addToLibrary:{
      type: DataTypes.BOOLEAN,
    }
  });
  food.associate = (models) => {
    food.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return food;
};
