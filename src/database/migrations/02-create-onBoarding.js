
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await queryInterface.createTable('onBoardings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      manage: {
        type: Sequelize.STRING,
      },
      typeOfDiabetes: {
        type: Sequelize.STRING,
      },
      habit: {
        type: Sequelize.STRING,
      },
      habitDetails: {
        type: Sequelize.STRING,
      },
      improvement: {
        type: Sequelize.BOOLEAN,
      },
      habitManagement: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      conditionOfHypertension: {
        type: Sequelize.STRING,
      },
      diagnosedDate: {
        type: Sequelize.DATE,
      },
      diagnosedStyle: {
        type: Sequelize.STRING,
      },
      insulin: {
        type: Sequelize.BOOLEAN,
      },
      relatedComplication: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      comorbidities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      onMedication: {
        type: Sequelize.BOOLEAN,
      },
      medicationInterval: {
        type: Sequelize.STRING,
      },
      medicationDetails: {
        type: Sequelize.ARRAY(Sequelize.JSON),
      },
      averageBloodGlucose: {
        type: Sequelize.STRING,
      },
      averageBloodPressure: {
        type: Sequelize.STRING,
      },
      bloodGlucose: {
        type: Sequelize.STRING,
      },
      weight: {
        type: Sequelize.STRING,
      },
      height: {
        type: Sequelize.STRING,
      },
      mainGoal:{
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      isCareTeamPresent: {
        type: Sequelize.BOOLEAN,
      },
      careTeam: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      isCareTeamList: {
        type: Sequelize.BOOLEAN,
      },
      progressRate: {
        type: Sequelize.STRING,
      },
      needsACareTeam: {
        type: Sequelize.BOOLEAN,
      },
      foodTimetable: {
        type: Sequelize.BOOLEAN,
      },
      personalizedFoodTimetable: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('onBoardings');
  },
};
