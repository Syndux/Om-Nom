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
          imgUrl: "",
        },
        {
          userId: 1,
          name: "Spicy Beef Bulgogi",
          cuisine: "Korean",
          imgUrl: "",
        },
        {
          userId: 2,
          name: "Pasta Carbonara",
          cuisine: "Italian",
          imgUrl: "",
        },
        {
          userId: 2,
          name: "Margarita Pizza",
          cuisine: "Italian",
          imgUrl: "",
        },
        {
          userId: 3,
          name: "Pad Thai",
          cuisine: "Thai",
          imgUrl: "",
        },
        {
          userId: 3,
          name: "Som Tam",
          cuisine: "Thai",
          imgUrl: "",
        },
        {
          userId: 4,
          name: "BBQ Ribs",
          cuisine: "American",
          imgUrl: "",
        },
        {
          userId: 4,
          name: "Caesar Salad",
          cuisine: "American",
          imgUrl: "",
        },
        {
          userId: 5,
          name: "Spaghetti Bolognese",
          cuisine: "Italian",
          imgUrl: "",
        },
        {
          userId: 5,
          name: "Chicken Alfredo",
          cuisine: "Italian",
          imgUrl: "",
        },
        {
          userId: 6,
          name: "Galbi (Korean BBQ Short Ribs)",
          cuisine: "Korean",
          imgUrl: "",
        },
        {
          userId: 6,
          name: "Korean Fried Chicken",
          cuisine: "Korean",
          imgUrl: "",
        },
        {
          userId: 7,
          name: "Japchae",
          cuisine: "Korean",
          imgUrl: "",
        },
        {
          userId: 7,
          name: "Tteok-bokki",
          cuisine: "Korean",
          imgUrl: "",
        },
        {
          userId: 8,
          name: "Chicken Curry",
          cuisine: "Indian",
          imgUrl: "",
        },
        {
          userId: 8,
          name: "Chicken Biryani",
          cuisine: "Indian",
          imgUrl: "",
        },
        {
          userId: 9,
          name: "Miso Soup",
          cuisine: "Japanese",
          imgUrl: "",
        },
        {
          userId: 9,
          name: "Beef Sukiyako",
          cuisine: "Japanese",
          imgUrl: "",
        },
        {
          userId: 10,
          name: "Pho",
          cuisine: "Vietnamese",
          imgUrl: "",
        },
        {
          userId: 10,
          name: "Bun Bo Hue",
          cuisine: "Vietnamese",
          imgUrl: "",
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
