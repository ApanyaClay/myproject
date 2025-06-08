'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('account_types', [
      {
        name: 'Tabungan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Giro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Investasi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dompet Digital',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('account_types', null, {});
  }
};
