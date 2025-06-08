'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User, {
        foreignKey: 'role_id', // Kolom di tabel User yang menjadi foreign key
        as: 'users' // Alias untuk relasi saat melakukan query (include)
      });
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Wajib diisi
      unique: true // Nama role harus unik (e.g., 'admin', 'user')
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};