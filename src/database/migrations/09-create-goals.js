'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('groups');
  },
};
