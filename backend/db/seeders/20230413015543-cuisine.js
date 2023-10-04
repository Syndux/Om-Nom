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
          name: "Korean"
        },
        {
          name: "Italian"
        },
        {
          name: "Thai"
        },
        {
          name: "American"
        },
        {
          name: "Greek"
        },
        {
          name: "Indian"
        },
        {
          name: "Japanese"
        },
        {
          name: "Vietnamese"
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
