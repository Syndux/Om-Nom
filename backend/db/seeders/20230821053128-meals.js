"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Meals";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          name: "Dol Sot Bi Bim Bap",
          cuisine: "Korean",
        },
        {
          userId: 1,
          name: "Spicy Beef Bulgogi",
          cuisine: "Korean",
        },
        {
          userId: 2,
          name: "Pasta Carbonara",
          cuisine: "Italian",
        },
        {
          userId: 2,
          name: "Margarita Pizza",
          cuisine: "Italian",
        },
        {
          userId: 3,
          name: "Pad Thai",
          cuisine: "Thai",
        },
        {
          userId: 3,
          name: "Som Tam",
          cuisine: "Thai",
        },
        {
          userId: 4,
          name: "BBQ Ribs",
          cuisine: "American",
        },
        {
          userId: 4,
          name: "Caesar Salad",
          cuisine: "American",
        },
        {
          userId: 5,
          name: "Spaghetti Bolognese",
          cuisine: "Italian",
        },
        {
          userId: 5,
          name: "Chicken Alfredo",
          cuisine: "Italian",
        },
        {
          userId: 6,
          name: "Galbi (Korean BBQ Short Ribs)",
          cuisine: "Korean",
        },
        {
          userId: 6,
          name: "Korean Fried Chicken",
          cuisine: "Korean",
        },
        {
          userId: 7,
          name: "Japchae",
          cuisine: "Korean",
        },
        {
          userId: 7,
          name: "Tteok-bokki",
          cuisine: "Korean",
        },
        {
          userId: 8,
          name: "Chicken Curry",
          cuisine: "Indian",
        },
        {
          userId: 8,
          name: "Chicken Biryani",
          cuisine: "Indian",
        },
        {
          userId: 9,
          name: "Miso Soup",
          cuisine: "Japanese",
        },
        {
          userId: 9,
          name: "Beef Sukiyako",
          cuisine: "Japanese",
        },
        {
          userId: 10,
          name: "Pho",
          cuisine: "Vietnamese",
        },
        {
          userId: 10,
          name: "Bun Bo Hue",
          cuisine: "Vietnamese",
        },
      ],
      { validate: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Meals";
    return queryInterface.bulkDelete(options, null, {});
  },
};
