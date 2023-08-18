"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@user.io",
          username: "DemoUser",
          firstName: "Demo",
          lastName: "User",
          hashedPassword: bcrypt.hashSync("password"),
          imgUrl: "",
        },
        {
          email: "user1@user.io",
          username: "TestUser1",
          firstName: "User",
          lastName: "One",
          hashedPassword: bcrypt.hashSync("password"),
          imgUrl: "",
        },
        {
          email: "user2@user.io",
          username: "TestUser2",
          firstName: "User",
          lastName: "Two",
          hashedPassword: bcrypt.hashSync("password"),
          imgUrl: "",
        },
        {
          email: "user3@user.io",
          username: "TestUser3",
          firstName: "User",
          lastName: "Three",
          hashedPassword: bcrypt.hashSync("password"),
          imgUrl: "",
        },
        {
          email: "user4@user.io",
          username: "TestUser4",
          firstName: "User",
          lastName: "Four",
          hashedPassword: bcrypt.hashSync("password"),
          imgUrl: "",
        },
        {
          email: "user5@user.io",
          username: "TestUser5",
          firstName: "User",
          lastName: "Five",
          hashedPassword: bcrypt.hashSync("password"),
          imgUrl: "",
        },
        {
          email: "user6@user.io",
          username: "TestUser6",
          firstName: "User",
          lastName: "Six",
          hashedPassword: bcrypt.hashSync("password"),
          imgUrl: "",
        },
        {
          email: "user7@user.io",
          username: "TestUser7",
          firstName: "User",
          lastName: "Seven",
          hashedPassword: bcrypt.hashSync("password"),
          imgUrl: "",
        },
        {
          email: "user8@user.io",
          username: "TestUser8",
          firstName: "User",
          lastName: "Eight",
          hashedPassword: bcrypt.hashSync("password"),
          imgUrl: "",
        },
        {
          email: "user9@user.io",
          username: "TestUser9",
          firstName: "User",
          lastName: "Nine",
          hashedPassword: bcrypt.hashSync("password"),
          imgUrl: "",
        },
        {
          email: "user10@user.io",
          username: "TestUser10",
          firstName: "User",
          lastName: "Ten",
          hashedPassword: bcrypt.hashSync("password"),
          imgUrl: "",
        },
      ],
      { validate: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkDelete(options, null, {});
  },
};
