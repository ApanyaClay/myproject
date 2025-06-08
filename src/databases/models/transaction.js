'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Transaksi ini terhubung ke satu Kategori
      Transaction.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });
      // Transaksi ini menggunakan satu Metode Pembayaran
      Transaction.belongsTo(models.PaymentMethod, {
        foreignKey: 'payment_method_id',
        as: 'paymentMethod'
      });
      // Transaksi ini berasal dari satu Akun (sumber)
      Transaction.belongsTo(models.Account, {
        foreignKey: 'source_account_id',
        as: 'sourceAccount'
      });
      // Transaksi ini menuju ke satu Akun (tujuan)
      Transaction.belongsTo(models.Account, {
        foreignKey: 'destination_account_id',
        as: 'destinationAccount'
      });
    }
  }
  Transaction.init({
    source_account_id: DataTypes.INTEGER,
    destination_account_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    payment_method_id: DataTypes.INTEGER,
    type: {
      type: DataTypes.ENUM('income', 'expense', 'transfer'),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    description: DataTypes.TEXT,
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};