'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FoodIngredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      foodId: {
        type: Sequelize.INTEGER,
        references: { model: "Food", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      ingredientId: {
        type: Sequelize.INTEGER,
        references: { model: "Ingredients", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      quantity: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FoodIngredients', options);
  }
};