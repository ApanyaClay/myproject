'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'role_id', // Kolom di tabel ini yang menjadi foreign key
        as: 'role', // Alias untuk relasi, e.g., user.getRole()
      });
      User.hasMany(models.Account, {
        foreignKey: 'user_id',
        as: 'accounts',
      });
      User.hasMany(models.PaymentMethod, {
        foreignKey: 'user_id',
        as: 'paymentMethods',
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Email harus unik
        validate: {
          isEmail: true, // Validasi format email
        },
      },
      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true, // Boleh null karena mungkin belum verifikasi
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT, // Gunakan TEXT untuk alamat yang mungkin panjang
        allowNull: true, // Alamat bersifat opsional
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true, // Nomor telepon bersifat opsional
        unique: true,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending', 'suspended', 'banned'),
        allowNull: false,
        defaultValue: 'pending', // Nilai default saat user baru dibuat
      },
      remember_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles', // Nama tabel yang direferensikan (bentuk jamak)
          key: 'id', // Kolom di tabel Roles yang direferensikan
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
