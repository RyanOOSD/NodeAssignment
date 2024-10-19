/*
Author: Ryan Angaangan
Student ID: 000783037
Date: October 17, 2024
Course: CPRG 210 - Web Application Development
Assignment: Node.js
*/

// Importing Express, sequelize database connection, path, custom greeting, express validator
const express = require("express");
const sequelize = require("./utils/database");
const path = require("path");
const greeting = require("./utils/greeting");
const { body, validationResult } = require("express-validator");

// Import model
const Contact = require("./models/contact")

// Create Express application, define port number, retrieve application dir
const app = express();
const port = 8000;
const rootDir = path.dirname(require.main.filename);

// Import view engine, enable form parsing, enable express to handle JSON middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set static directories for images and js
app.use(express.static(path.join(rootDir,"public/")));

// Connect to the database
sequelize.sync({force: false})
    .then(() =>{
        console.log("Sucessfully synced with cprg212 database.")
    })
    .catch(err => console.error("Can't sync!", err));

// Endpoint to serve homepage, passes page title for header
app.get("/",(req, res) => {
    res.render("index", {pageTitle: "Homepage | The Bread Site", greetText: greeting.randomGreeting});
});

// Endpoint to serve about page, passes page title for header
app.get("/about",(req, res) => {
    res.render("about", {pageTitle: "About | The Bread Site"});
});

// Endpoint to serve contact page
app.get("/contact-us", async(req, res) => {
    // Waits for database query to complete before rendering page, passes page title for header
    const contacts = await Contact.findAll();
    res.render("contactus", {pageTitle: "Contact Us | The Bread Site", contacts});
});

// Handle contact form submission and load thank you page
app.post(
    "/add-contact",
    [
        [
            /* 
            Doing basic server-side validation with express-validator
            Unpacks the form data, defines an error message
            Then the specified validator performs the check
            Uses the locale and ignores any special characters specified in the curly braces
            */
            
            // First name ust be alphabetical only, ignores specified special characters
            body("firstname", "Invalid first name.").isAlpha("en-US", {ignore: "\s.-'"}),

            // Last name must be alphabetical only, ignores specified special characters
            body("lastname", "Invalid last name.").isAlpha("en-US", {ignore: "\s.-'"}),

            // Email must be in valid email format
            body("email", "Invalid email.").isEmail(),

            // Phone numner must only contain numbers
            body("phonenum", "Invalid phone number.").isNumeric(),

            // City must be alphabetical only, ignores specified special characters
            body("city", "Invalid city.").isAlpha("en-US", {ignore: "\s.-'"}),

            // Province must be alphabetical only, ignores spaces only
            body("province", "Invalid province.").isAlpha("en-US", {ignore: "\s"}),

            // Postal code must be alphanumeric, ignores spaces only
            body("postalcode", "Invalid postal code.").isAlphanumeric("en-US", {ignore: "\s"}),

            // Feedback must be alphanumeric, ignores specified special characters
            body("feedback", "Invalid feedback.").isAlphanumeric("en-US", {ignore: "&!,\s.-'"}),
        ],
    ],
    async(req, res) => {
        // Stores the validation result
        const error = validationResult(req);

        // Pulls error messages from validationResult
        const extractErr = validationResult.withDefaults({
            formatter: error => error.msg,
        });
        const printErr = extractErr(req).array();

        // If there are any errors with validation, don't submit the form and load an error page
        if (!error.isEmpty()) {
            return res.render("formfail", {pageTitle: "Invalid submission!", badSubmit: printErr});
        };
        
        // If the form submission is valid, deconstructs the form data and inserts it into the database
        const { firstname, lastname, email, phonenum, city, province, postalcode, feedback } = req.body;
        await Contact.create({firstname, lastname, email, phonenum, city, province, postalcode, feedback});
        res.render("thankyou", {pageTitle: "Thank you! | The Bread Site", thankUser: firstname, thankEmail: email });
    }
);

// Endpoint to load edit page for a contact
app.get("/edit-contact/:id", async(req, res) => {
    // Searching database with primary key, using id parameter to find the record before loading edit page
    const contact = await Contact.findByPk(req.params.id);
    res.render("editcontact", {pageTitle: "Editing Contact | The Bread Site", contact});
});

// Handle form submission from the edit page, validating input again
app.post(
    "/edit-contact/:id",
    [
        [
            // Validate input on the edit page too
            body("firstname", "Invalid first name").isAlpha("en-US", {ignore: "\s.-'"}),
            body("lastname", "Invalid last name").isAlpha("en-US", {ignore: "\s.-'"}),
            body("email", "Invalid email").isEmail(),
            body("phonenum", "Invalid phone number").isNumeric(),
            body("city", "Invalid city").isAlpha("en-US", {ignore: "\s.-'"}),
            body("province", "Invalid province").isAlpha("en-US", {ignore: "\s"}),
            body("postalcode", "Invalid postal code").isAlphanumeric("en-US", {ignore: "\s"}),
            body("feedback", "Invalid feedback").isAlphanumeric("en-US", {ignore: "&!,\s.-'"}),
        ],
    ],
    async(req, res) => {
        const error = validationResult(req);
        const extractErr = validationResult.withDefaults({
            formatter: error => error.msg,
        });
        const printErr = extractErr(req).array();

        // If there are any errors with validation, don't submit the form and load an error page
        if (!error.isEmpty()) {
            return res.render("formfail", {pageTitle: "Invalid submission!", badSubmit: printErr});
        };

        const { firstname, lastname, email, phonenum, city, province, postalcode, feedback } = req.body;
        // Update the record corresponding to the id before loading success page
        await Contact.update ({ firstname, lastname, email, phonenum, city, province, postalcode, feedback }, {
            where: {id: req.params.id}
        });
        res.render("editsuccess", {pageTitle: "Edit Success | The Bread Site", editUser: firstname});
    }
);

// Delete endpoint to remove a contact corresponding to the id
app.get("/delete-contact/:id", async(req, res) => {
    await Contact.destroy({where: {id: req.params.id}});
    // Re-queries database before reloading contact page
    const contacts = await Contact.findAll();
    res.render("contactus", {pageTitle: "Contact Us | The Bread Site", contacts});
});

// Generic endpoint serves error page for invalid requests
app.use((req, res) => {
    res.render("error", {pageTitle: "Error! | The Bread Site", invalidUrl: req.url});
});

// Server listening on the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});