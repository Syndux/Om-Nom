"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cuisine.hasMany(models.Food, {
        foreignKey: "cuisineId",
        as: "cuisine",
      });
      Cuisine.belongsTo(models.User, {
        foreignKey: "creatorId",
        as: "creatorCuisine",
      });
    }
  }
  Cuisine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 120],
        }
      },
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
    },
    {
      sequelize,
      modelName: "Cuisine",
    }
  );
  return Cuisine;
};
