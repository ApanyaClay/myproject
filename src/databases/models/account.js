'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      // Akun ini memiliki satu Jenis Akun
      Account.belongsTo(models.AccountType, {
        foreignKey: 'account_type_id',
        as: 'type',
      });
      // Satu Akun bisa menjadi sumber banyak transaksi
      Account.hasMany(models.Transaction, {
        foreignKey: 'source_account_id',
        as: 'outgoingTransactions',
      });
      // Satu Akun bisa menjadi tujuan banyak transaksi
      Account.hasMany(models.Transaction, {
        foreignKey: 'destination_account_id',
        as: 'incomingTransactions',
      });
    }
  }
  Account.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nama tabel Users
          key: 'id',
        },
      },
      account_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'AccountTypes', // Nama tabel AccountTypes
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        // Gunakan DECIMAL untuk data keuangan agar presisi
        type: DataTypes.DECIMAL(15, 2), // 15 digit total, 2 di belakang koma
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      modelName: 'Account',
    }
  );
  return Account;
};
