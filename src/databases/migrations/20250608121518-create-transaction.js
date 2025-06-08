'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      source_account_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Boleh null untuk tipe 'income'
        references: {
          model: 'accounts', // Pastikan nama tabel ini benar
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      destination_account_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Boleh null untuk tipe 'expense'
        references: {
          model: 'accounts', // Pastikan nama tabel ini benar
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Boleh null jika tidak ada kategori
        references: {
          model: 'categories',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      payment_method_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Boleh null
        references: {
          model: 'payment_methods',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      type: {
        type: Sequelize.ENUM('income', 'expense', 'transfer'),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      transaction_date: {
        type: Sequelize.DATE, // DATE akan menjadi TIMESTAMP di MySQL
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};