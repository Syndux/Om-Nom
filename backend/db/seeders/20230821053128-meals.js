'use strict';
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
      []
    )
  },

  down: async  (queryInterface, Sequelize) => {
    options.tableName = "Meals";
    return queryInterface.bulkDelete(options, null, {});
  },
};
