"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.belongsTo(models.User, {
        foreignKey: "creatorId",
        as: "creator",
      });
      Food.belongsToMany(models.Ingredient, {
        through: "FoodIngredients",
        foreignKey: "foodId",
        as: "ingredients",
      });
      Food.belongsTo(models.Cuisine, {
        foreignKey: "cuisineId",
        as: "cuisine",
      });
    }
  }
  Food.init(
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
        validate: {
          len: [2, 120],
          async isUniqueFood(val) {
            const existingFood = await Food.findOne({
              where: {
                creatorId: this.creatorId,
                name: val,
              },
            });
            if (existingFood) {
              throw new Error("You already have an existing food with this name!");
            }
          },
        },
      },
      cuisineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING,
        validate: {
          type: DataTypes.STRING,
          validate: {
            isUrl: true,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return Food;
};
