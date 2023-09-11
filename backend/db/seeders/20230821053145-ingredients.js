"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Ingredients";
    return queryInterface.bulkInsert(
      options,
      [
        {
          creatorId: 1,
          name: "Soy Sauce",
          imgUrl: "",
        },
        {
          creatorId: 1,
          name: "White Sugar",
          imgUrl: "",
        },
        {
          creatorId: 1,
          name: "Brown Sugar",
          imgUrl: "",
        },
        {
          creatorId: 2,
          name: "Garlic",
          imgUrl: "",
        },
        {
          creatorId: 2,
          name: "Green Onion",
          imgUrl: "",
        },
        {
          creatorId: 3,
          name: "Sesame Seed",
          imgUrl: "",
        },
        {
          creatorId: 3,
          name: "Rib Eye Steak",
          imgUrl: "",
        },
        {
          creatorId: 4,
          name: "Salt",
          imgUrl: "",
        },
        {
          creatorId: 4,
          name: "Black Pepper",
          imgUrl: "",
        },
        {
          creatorId: 4,
          name: "Glutinous White Rice",
          imgUrl: "",
        },
        {
          creatorId: 5,
          name: "Water",
          imgUrl: "",
        },
        {
          creatorId: 5,
          name: "Spinach",
          imgUrl: "",
        },
        {
          creatorId: 6,
          name: "Cucumber",
          imgUrl: "",
        },
        {
          creatorId: 6,
          name: "Sesame Oil",
          imgUrl: "",
        },
        {
          creatorId: 7,
          name: "Egg",
          imgUrl: "",
        },
        {
          creatorId: 7,
          name: "Onion",
          imgUrl: "",
        },
        {
          creatorId: 8,
          name: "White Wine Vineger",
          imgUrl: "",
        },
      ],
      { validate: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Ingredients";
    return queryInterface.bulkDelete(options, null, {});
  },
};
