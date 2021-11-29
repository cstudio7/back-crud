/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object} Comment model
 */
module.exports = (sequelize, DataTypes) => {
  const activity = sequelize.define('activity', {
    userId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
    },
    activity: {
      type: DataTypes.STRING,
    },
    difficulty: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    avatar: DataTypes.STRING,
    avatarAwsDetails: DataTypes.JSONB,
    note: {
      type: DataTypes.STRING,
    },
    startTime: {
      type: DataTypes.TIME,
    }
  });
  activity.associate = (models) => {
    activity.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'activities',
      onDelete: 'CASCADE',
    });
  };
  return activity;
};
