'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('healthSettings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      bloodPressureMin: {
        type: Sequelize.JSONB,
      },
      bloodPressureMax:{
        type: Sequelize.JSONB,
      },
      bloodGlucoseMin: {
        type: Sequelize.JSONB,
      },
      bloodGlucoseMax:{
        type: Sequelize.JSONB,
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
    return queryInterface.dropTable('healthSettings');
  },
};
