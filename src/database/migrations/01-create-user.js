module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.BIGINT,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.DATE,
      },
      race: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      avatarAwsDetails: {
        type: Sequelize.JSONB,
      },
      emergencyContact: {
        type: Sequelize.STRING,
      },
      manage: {
        type: Sequelize.STRING,
      },
      typeOfDiabetes: {
        type: Sequelize.STRING,
      },
      typeOfHypertension: {
        type: Sequelize.STRING,
      },
      a1c: {
        type: Sequelize.STRING
      },
      bloodPressure: {
        type: Sequelize.STRING
      },
      bloodGlucose: {
        type: Sequelize.STRING
      },
      bloodPressureMin: {
        type: Sequelize.STRING
      },
      bloodPressureMax:{
        type: Sequelize.STRING
      },
      bloodGlucoseMin: {
        type: Sequelize.STRING
      },
      bloodGlucoseMax:{
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.STRING
      },
      diagnosedDate: {
        type: Sequelize.DATE,
      },
      password: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING(500)
      },
      code: {
        type: Sequelize.STRING(6),
      },
      group: {
        type: Sequelize.INTEGER,
      },
      state: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      authType: {
        type: Sequelize.STRING,
      },
      isVerified: {
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
    await queryInterface.dropTable('users');
  },
};
