'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavingGoal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SavingGoal.belongsTo(models.Account, {
        foreignKey: 'account_id', // Kolom di tabel SavingGoal yang menjadi foreign key
        as: 'account' // Alias untuk relasi saat melakukan query (include)
      });
    }
  }
  SavingGoal.init({
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Accounts', // Nama model yang direferensikan
        key: 'id' // Kolom yang menjadi foreign key
      }
    },
    target_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    target_date: {
      type: DataTypes.DATEONLY
    },
    status: {
      type: DataTypes.ENUM('in_progress', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'active'
    },
  }, {
    sequelize,
    modelName: 'SavingGoal',
  });
  return SavingGoal;
};