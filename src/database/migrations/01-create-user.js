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
      avatar: {
        type: Sequelize.STRING,
      },
      avatarAwsDetails: {
        type: Sequelize.JSONB,
      },
      emergencyContact: {
        type: Sequelize.JSONB,
      },
      manage: {
        type: Sequelize.STRING,
      },
      emergencyMail: {
        type: Sequelize.STRING,
      },
      diabetesProfile: {
        type: Sequelize.JSONB,
      },
      hypertensionProfile: {
        type: Sequelize.JSONB,
      },
      lifestyleProfile: {
        type: Sequelize.JSONB,
      },
      password: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING(6),
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
