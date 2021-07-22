'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
    return queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'tailor',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'fashionista',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'weaver',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'agent',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'union',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete('roles', null, {});
  },
};
