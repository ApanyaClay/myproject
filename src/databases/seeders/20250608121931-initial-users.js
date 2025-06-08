'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

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
   const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM roles WHERE name IN ('admin', 'user');`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const roleMap = roles.reduce((map, role) => {
      map[role.name] = role.id;
      return map;
    }, {});

    const users = [];
    const hashedPassword = await bcrypt.hash('password', 10); // Hash password default 'password'

    // Buat 1 Admin
    users.push({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role_id: roleMap.admin,
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Buat 4 User biasa
    for (let i = 0; i < 4; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role_id: roleMap.user,
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
