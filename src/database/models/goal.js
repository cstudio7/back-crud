/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object} Comment model
 */
module.exports = (sequelize, DataTypes) => {
  const goal = sequelize.define('goal', {
    userId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING,
    },
    interval: {
      type: DataTypes.STRING,
    },
    goal: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
    },
    notification: {
      type: DataTypes.BOOLEAN,
    },
    goalDay: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    notificationDelay: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    startTime: {
      type: DataTypes.TIME,
    },
    streak: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
    },
  });
  goal.associate = (models) => {
    goal.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'goals',
      onDelete: 'CASCADE',
    });
  };
  return goal;
};
