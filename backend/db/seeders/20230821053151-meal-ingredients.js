"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "MealIngredients";
    return queryInterface.bulkInsert(
      options,
      [
        {
          mealId: 1,
          ingredientId: 1,
          quantity: 132,
          unit: "grams",
        },
        {
          mealId: 1,
          ingredientId: 2,
          quantity: 20,
          unit: "grams",
        },
        {
          mealId: 2,
          ingredientId: 1,
          quantity: 5,
          unit: "tablespoons",
        },
        {
          mealId: 2,
          ingredientId: 4,
          quantity: 2,
          unit: "tablespoons",
        },
        {
          mealId: 3,
          ingredientId: 4,
          quantity: 3,
          unit: "cloves",
        },
        {
          mealId: 3,
          ingredientId: 15,
          quantity: 3,
          unit: null,
        },
        {
          mealId: 4,
          ingredientId: 2,
          quantity: 20,
          unit: "grams",
        },
        {
          mealId: 4,
          ingredientId: 15,
          quantity: 1,
          unit: null,
        },
        {
          mealId: 5,
          ingredientId: 1,
          quantity: 1,
          unit: "tablespoon",
        },
        {
          mealId: 5,
          ingredientId: 15,
          quantity: 1,
          unit: null,
        },
        {
          mealId: 6,
          ingredientId: 1,
          quantity: 1,
          unit: "tablespoon",
        },
        {
          mealId: 6,
          ingredientId: 15,
          quantity: 1,
          unit: null,
        },
        {
          mealId: 7,
          ingredientId: 3,
          quantity: 2,
          unit: "tablespoons",
        },
        {
          mealId: 7,
          ingredientId: 4,
          quantity: 2,
          unit: "cloves",
        },
        {
          mealId: 8,
          ingredientId: 15,
          quantity: 1,
          unit: null,
        },
        {
          mealId: 8,
          ingredientId: 17,
          quantity: 1,
          unit: "tablespoon",
        },
        {
          mealId: 9,
          ingredientId: 4,
          quantity: 4,
          unit: "cloves",
        },
        {
          mealId: 9,
          ingredientId: 8,
          quantity: 1,
          unit: "pinch",
        },
        {
          mealId: 10,
          ingredientId: 4,
          quantity: 1,
          unit: "clove",
        },
        {
          mealId: 10,
          ingredientId: 11,
          quantity: 0.25,
          unit: "cup",
        },
      ],
      { validate: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "MealIngredients";
    return queryInterface.bulkDelete(options, null, {});
  },
};
