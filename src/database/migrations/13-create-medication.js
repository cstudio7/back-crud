'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('medications', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: Sequelize.STRING,
      },
      type:{
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.BIGINT,
      },
      measuringUnit:{
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      time:{
        type: Sequelize.TIME,
      },
      tag: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      avatarAwsDetails: {
        type: Sequelize.JSONB,
      },
      addToLibrary:{
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('medications');
  },
};
