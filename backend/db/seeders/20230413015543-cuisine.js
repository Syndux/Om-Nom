"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Cuisines";
    return queryInterface.bulkInsert(
      options,
      [
        {
          name: "Korean",
          creatorId: 11
        },
        {
          name: "Italian",
          creatorId: 11
        },
        {
          name: "Thai",
          creatorId: 11
        },
        {
          name: "American",
          creatorId: 11
        },
        {
          name: "Greek",
          creatorId: 11
        },
        {
          name: "Indian",
          creatorId: 11
        },
        {
          name: "Japanese",
          creatorId: 11
        },
        {
          name: "Vietnamese",
          creatorId: 11
        },
      ],
      { validate: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Cuisines";
    return queryInterface.bulkDelete(options, null, {});
  },
};
