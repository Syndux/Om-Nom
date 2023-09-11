"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ingredient.belongsTo(models.User, {
        foreignKey: "creatorId",
        as: "ingredientCreator",
      });
      Ingredient.belongsToMany(models.Food, {
        through: "FoodIngredients",
        foreignKey: "ingredientId",
        as: "foods"
      })
    }
  }
  Ingredient.init(
    {
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 120]
        }
      },
      imgUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Ingredient",
    }
  );
  return Ingredient;
};
