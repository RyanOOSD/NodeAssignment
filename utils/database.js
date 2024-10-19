/*
Author: Ryan Angaangan
Student ID: 000783037
Date: October 17, 2024
Course: CPRG 210 - Web Application Development
Assignment: Node.js
*/

// Import sequelize
const Sequelize = require("sequelize");

// Create the connection
const sequelize = new Sequelize("cprg212", "root", "Cprg212user", {
      host: "localhost",
      dialect: "mysql"
   }
);

// Exporting the connection
module.exports = sequelize;