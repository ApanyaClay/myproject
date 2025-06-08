'use strict';
const { faker } = require('@faker-js/faker');

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
   const users = await queryInterface.sequelize.query(
      'SELECT id FROM users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const accountTypes = await queryInterface.sequelize.query(
      'SELECT id FROM account_types;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (users.length === 0 || accountTypes.length === 0) {
      console.log('Tidak bisa membuat seeder account karena data user atau account_types kosong.');
      return;
    }

    const accounts = [];
    // Untuk setiap user, buat 1 atau 2 akun
    for (const user of users) {
      const numberOfAccounts = Math.floor(Math.random() * 2) + 1; // 1 or 2

      for (let i = 0; i < numberOfAccounts; i++) {
        // Pilih jenis akun secara acak
        const randomAccountType = accountTypes[Math.floor(Math.random() * accountTypes.length)];
        
        accounts.push({
          user_id: user.id,
          account_type_id: randomAccountType.id,
          name: `${faker.finance.accountName()} - ${user.id}`,
          balance: faker.finance.amount({ min: 0, max: 25000000, dec: 2 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('accounts', accounts, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('accounts', null, {});
  }
};
