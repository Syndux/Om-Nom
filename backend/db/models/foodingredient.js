"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FoodIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FoodIngredient.belongsTo(models.Food, {
        foreignKey: "foodId",
        as: "food",
      });
      FoodIngredient.belongsTo(models.Ingredient, {
        foreignKey: "ingredientId",
        as: "ingredient",
      });
    }
  }
  FoodIngredient.init(
    {
      foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      quantity: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: true,
        },
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "FoodIngredient",
    }
  );
  return FoodIngredient;
};
