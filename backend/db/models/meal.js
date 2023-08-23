"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Meal.init(
    {
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 120],
          async isUniqueMeal(val) {
            const existingMeal = await Meal.findOne({
              where: {
                userId: this.userId,
                name: val,
              },
            });
            if (existingMeal) {
              throw new Error("You already have an existing meal with this name!");
            }
          },
        },
      },
      cuisine: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 20],
        },
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
      modelName: "Meal",
    }
  );
  return Meal;
};
