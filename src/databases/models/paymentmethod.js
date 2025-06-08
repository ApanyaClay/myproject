'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PaymentMethod.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      PaymentMethod.hasMany(models.Transaction, {
        foreignKey: 'payment_method_id',
        as: 'transactions',
      });
    }
  }
  PaymentMethod.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('Credit Card', 'Debit Card', 'Bank Account'),
        allowNull: false,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'PaymentMethod',
    }
  );
  return PaymentMethod;
};
