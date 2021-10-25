'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('foods', {
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
      name: {
        type: Sequelize.STRING,
      },
      addRecipe:{
        type: Sequelize.ARRAY(Sequelize.JSONB),
      },
      desc: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      avatarAwsDetails: {
        type: Sequelize.JSONB,
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
    return queryInterface.dropTable('foods');
  },
};
