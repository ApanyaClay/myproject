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
   await queryInterface.bulkInsert('categories', [
      // Kategori Pemasukan (Income)
      {
        name: 'Gaji',
        type: 'income',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bonus',
        type: 'income',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hadiah',
        type: 'income',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Kategori Pengeluaran (Expense)
      {
        name: 'Makanan & Minuman',
        type: 'expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Transportasi',
        type: 'expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tagihan',
        type: 'expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Belanja',
        type: 'expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hiburan',
        type: 'expense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('categories', null, {});
  }
};
