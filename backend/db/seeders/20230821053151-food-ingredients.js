"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "FoodIngredients";
    return queryInterface.bulkInsert(
      options,
      [
        {
          foodId: 1,
          ingredientId: 1,
          quantity: 132,
          unit: "grams",
        },
        {
          foodId: 1,
          ingredientId: 2,
          quantity: 20,
          unit: "grams",
        },
        {
          foodId: 2,
          ingredientId: 1,
          quantity: 5,
          unit: "tablespoons",
        },
        {
          foodId: 2,
          ingredientId: 4,
          quantity: 2,
          unit: "tablespoons",
        },
        {
          foodId: 3,
          ingredientId: 4,
          quantity: 3,
          unit: "cloves",
        },
        {
          foodId: 3,
          ingredientId: 15,
          quantity: 3,
          unit: null,
        },
        {
          foodId: 4,
          ingredientId: 2,
          quantity: 20,
          unit: "grams",
        },
        {
          foodId: 4,
          ingredientId: 15,
          quantity: 1,
          unit: null,
        },
        {
          foodId: 5,
          ingredientId: 1,
          quantity: 1,
          unit: "tablespoon",
        },
        {
          foodId: 5,
          ingredientId: 15,
          quantity: 1,
          unit: null,
        },
        {
          foodId: 6,
          ingredientId: 1,
          quantity: 1,
          unit: "tablespoon",
        },
        {
          foodId: 6,
          ingredientId: 15,
          quantity: 1,
          unit: null,
        },
        {
          foodId: 7,
          ingredientId: 3,
          quantity: 2,
          unit: "tablespoons",
        },
        {
          foodId: 7,
          ingredientId: 4,
          quantity: 2,
          unit: "cloves",
        },
        {
          foodId: 8,
          ingredientId: 15,
          quantity: 1,
          unit: null,
        },
        {
          foodId: 8,
          ingredientId: 17,
          quantity: 1,
          unit: "tablespoon",
        },
        {
          foodId: 9,
          ingredientId: 4,
          quantity: 4,
          unit: "cloves",
        },
        {
          foodId: 9,
          ingredientId: 8,
          quantity: 1,
          unit: "pinch",
        },
        {
          foodId: 10,
          ingredientId: 4,
          quantity: 1,
          unit: "clove",
        },
        {
          foodId: 10,
          ingredientId: 11,
          quantity: 0.25,
          unit: "cup",
        },
      ],
      { validate: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "foodIngredients";
    return queryInterface.bulkDelete(options, null, {});
  },
};
