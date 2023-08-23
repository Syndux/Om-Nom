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
          name: "Soy Sauce",
          imgUrl: "",
        },
        {
          name: "White Sugar",
          imgUrl: "",
        },
        {
          name: "Brown Sugar",
          imgUrl: "",
        },
        {
          name: "Garlic",
          imgUrl: "",
        },
        {
          name: "Green Onion",
          imgUrl: "",
        },
        {
          name: "Sesame Seed",
          imgUrl: "",
        },
        {
          name: "Rib Eye Steak",
          imgUrl: "",
        },
        {
          name: "Salt",
          imgUrl: "",
        },
        {
          name: "Black Pepper",
          imgUrl: "",
        },
        {
          name: "Glutinous White Rice",
          imgUrl: "",
        },
        {
          name: "Water",
          imgUrl: "",
        },
        {
          name: "Spinach",
          imgUrl: "",
        },
        {
          name: "Cucumber",
          imgUrl: "",
        },
        {
          name: "Sesame Oil",
          imgUrl: "",
        },
        {
          name: "Egg",
          imgUrl: "",
        },
        {
          name: "Onion",
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
