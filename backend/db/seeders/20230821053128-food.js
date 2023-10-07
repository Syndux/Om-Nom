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
          cuisineId: 1,
          imgUrl: "",
        },
        {
          creatorId: 1,
          name: "Spicy Beef Bulgogi",
          cuisineId: 1,
          imgUrl: "",
        },
        {
          creatorId: 2,
          name: "Pasta Carbonara",
          cuisineId: 2,
          imgUrl: "",
        },
        {
          creatorId: 2,
          name: "Margarita Pizza",
          cuisineId: 2,
          imgUrl: "",
        },
        {
          creatorId: 3,
          name: "Pad Thai",
          cuisineId: 3,
          imgUrl: "",
        },
        {
          creatorId: 3,
          name: "Som Tam",
          cuisineId: 3,
          imgUrl: "",
        },
        {
          creatorId: 4,
          name: "BBQ Ribs",
          cuisineId: 4,
          imgUrl: "",
        },
        {
          creatorId: 4,
          name: "Caesar Salad",
          cuisineId: 5,
          imgUrl: "",
        },
        {
          creatorId: 5,
          name: "Garlic Spaghetti",
          cuisineId: 2,
          imgUrl: "",
        },
        {
          creatorId: 5,
          name: "Chicken Alfredo",
          cuisineId: 2,
          imgUrl: "",
        },
        {
          creatorId: 6,
          name: "Galbi (Korean BBQ Short Ribs)",
          cuisineId: 1,
          imgUrl: "",
        },
        {
          creatorId: 6,
          name: "Korean Fried Chicken",
          cuisineId: 1,
          imgUrl: "",
        },
        {
          creatorId: 7,
          name: "Japchae",
          cuisineId: 1,
          imgUrl: "",
        },
        {
          creatorId: 7,
          name: "Tteok-bokki",
          cuisineId: 1,
          imgUrl: "",
        },
        {
          creatorId: 8,
          name: "Chicken Curry",
          cuisineId: 6,
          imgUrl: "",
        },
        {
          creatorId: 8,
          name: "Chicken Biryani",
          cuisineId: 6,
          imgUrl: "",
        },
        {
          creatorId: 9,
          name: "Miso Soup",
          cuisineId: 7,
          imgUrl: "",
        },
        {
          creatorId: 9,
          name: "Beef Sukiyaki",
          cuisineId: 7,
          imgUrl: "",
        },
        {
          creatorId: 10,
          name: "Pho",
          cuisineId: 8,
          imgUrl: "",
        },
        {
          creatorId: 10,
          name: "Bun Bo Hue",
          cuisineId: 8,
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
