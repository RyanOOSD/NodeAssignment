/*
Author: Ryan Angaangan
Student ID: 000783037
Date: October 17, 2024
Course: CPRG 210 - Web Application Development
Assignment: Node.js
*/

// Importing datatype and db connection
const {DataTypes} = require("sequelize");
const sequelize = require("../utils/database");

// Create contact model
const Contact = sequelize.define("contacts",{
    firstname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phonenum:{
        type: DataTypes.STRING,
        allowNull: false
    },
    city:{
        type: DataTypes.STRING,
        allowNull: false
    },
    province:{
        type: DataTypes.STRING,
        allowNull: false
    },
    postalcode:{
        type: DataTypes.STRING,
        allowNull: false
    },
    feedback:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    // Prevent sequelize from automatically adding timestamps
    timestamps: false
});

module.exports = Contact;