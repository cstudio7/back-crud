'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('inspirations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      background: {
        type: Sequelize.STRING,
      },
      icon:{
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      category:{
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      avatarAwsDetails: {
        type: Sequelize.JSONB,
      },
      quote: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('weights');
  },
};
