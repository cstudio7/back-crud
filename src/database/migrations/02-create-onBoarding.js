
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
        type: Sequelize.STRING,
      },
      comorbidities: {
        type: Sequelize.STRING,
      },
      onMedication: {
        type: Sequelize.BOOLEAN,
      },
      medicationInterval: {
        type: Sequelize.STRING,
      },
      medicationDetails: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
      },
      averageBloodGlucose: {
        type: Sequelize.STRING,
      },
      bloodGlucose: {
        type: Sequelize.JSONB
      },
      weight: {
        type: Sequelize.JSONB
      },
      height: {
        type: Sequelize.JSONB
      },
      mainGoal:{
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      isCareTeamPresent: {
        type: Sequelize.BOOLEAN,
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
