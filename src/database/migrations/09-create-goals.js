'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('goals', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      title: {
        type: Sequelize.STRING,
      },
      interval:{
        type: Sequelize.STRING,
      },
      goal: {
        type: Sequelize.STRING,
      },
      desc:{
        type: Sequelize.STRING,
      },
      notification: {
        type: Sequelize.BOOLEAN,
      },
      goalDay:{
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      notificationDelay: {
        type: Sequelize.STRING,
      },
      startDate:{
        type: Sequelize.DATE,
      },
      startTime:{
        type: Sequelize.TIME,
      },
      streak:{
        type: Sequelize.ARRAY(Sequelize.JSONB),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('goals');
  },
};
