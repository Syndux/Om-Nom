"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Food";
    return queryInterface.bulkInsert(
      options,
      [
        {
          creatorId: 1,
          name: "Dol Sot Bi Bim Bap",
          cuisine: "Korean",
          imgUrl: "",
        },
        {
          creatorId: 1,
          name: "Spicy Beef Bulgogi",
          cuisine: "Korean",
          imgUrl: "",
        },
        {
          creatorId: 2,
          name: "Pasta Carbonara",
          cuisine: "Italian",
          imgUrl: "",
        },
        {
          creatorId: 2,
          name: "Margarita Pizza",
          cuisine: "Italian",
          imgUrl: "",
        },
        {
          creatorId: 3,
          name: "Pad Thai",
          cuisine: "Thai",
          imgUrl: "",
        },
        {
          creatorId: 3,
          name: "Som Tam",
          cuisine: "Thai",
          imgUrl: "",
        },
        {
          creatorId: 4,
          name: "BBQ Ribs",
          cuisine: "American",
          imgUrl: "",
        },
        {
          creatorId: 4,
          name: "Caesar Salad",
          cuisine: "Greek",
          imgUrl: "",
        },
        {
          creatorId: 5,
          name: "Garlic Spaghetti",
          cuisine: "Italian",
          imgUrl: "",
        },
        {
          creatorId: 5,
          name: "Chicken Alfredo",
          cuisine: "Italian",
          imgUrl: "",
        },
        {
          creatorId: 6,
          name: "Galbi (Korean BBQ Short Ribs)",
          cuisine: "Korean",
          imgUrl: "",
        },
        {
          creatorId: 6,
          name: "Korean Fried Chicken",
          cuisine: "Korean",
          imgUrl: "",
        },
        {
          creatorId: 7,
          name: "Japchae",
          cuisine: "Korean",
          imgUrl: "",
        },
        {
          creatorId: 7,
          name: "Tteok-bokki",
          cuisine: "Korean",
          imgUrl: "",
        },
        {
          creatorId: 8,
          name: "Chicken Curry",
          cuisine: "Indian",
          imgUrl: "",
        },
        {
          creatorId: 8,
          name: "Chicken Biryani",
          cuisine: "Indian",
          imgUrl: "",
        },
        {
          creatorId: 9,
          name: "Miso Soup",
          cuisine: "Japanese",
          imgUrl: "",
        },
        {
          creatorId: 9,
          name: "Beef Sukiyaki",
          cuisine: "Japanese",
          imgUrl: "",
        },
        {
          creatorId: 10,
          name: "Pho",
          cuisine: "Vietnamese",
          imgUrl: "",
        },
        {
          creatorId: 10,
          name: "Bun Bo Hue",
          cuisine: "Vietnamese",
          imgUrl: "",
        },
      ],
      { validate: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Food";
    return queryInterface.bulkDelete(options, null, {});
  },
};
