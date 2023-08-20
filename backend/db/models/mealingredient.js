'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MealIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MealIngredient.init({
    mealId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    unit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MealIngredient',
  });
  return MealIngredient;
};