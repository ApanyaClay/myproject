'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Budget.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Budget.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });
    }
  }
  Budget.init({
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL(15, 2),
    period_month: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Budget',
  });
  return Budget;
};