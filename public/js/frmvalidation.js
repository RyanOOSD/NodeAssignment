/*
Author: Ryan Angaangan
Student ID: 000783037
Date: October 17, 2024
Course: CPRG 210 - Web Application Development
Assignment: Node.js
*/

// Client-side validation
// Create variables for each form field
const firstname = document.querySelector("#floatingFirst");
const lastname = document.querySelector("#floatingLast");
const email = document.querySelector("#floatingEmail");
const phone = document.querySelector("#floatingPhone");
const city = document.querySelector("#floatingCity");
const province = document.querySelector("#floatingProvince");
const postal = document.querySelector("#floatingPostal");
const feedback = document.querySelector("#floatingFeedback");

// Define regex expressions for comparison
const nameRegex = /^([A-Za-z]{1,}([\.,] |[-']| )?)+[A-Za-z]+\.?\s*$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/;
const cityRegex = /^[a-zA-Z',.\s-]{1,25}$/;
const postalRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
const feedbackRegex = /^[a-zA-Z0-9'&!,.\s-]{1,300}$/;

function formValidation() {
    // Create blank variable to store errors
    let errorMsg = "";

    // Perform basic validation for each field by comparing against regex
    if(!nameRegex.test(firstname.value)) {
        errorMsg += "First name is invalid.\n";
    }
    if(!nameRegex.test(lastname.value)) {
        errorMsg += "Last name is invalid.\n";
    }
    if(!emailRegex.test(email.value)) {
        errorMsg += "Email is invalid.\n";
    }
    if(!phoneRegex.test(phone.value)) {
        errorMsg += "Phone number is invalid.\n";
    }
    if(!cityRegex.test(city.value)) {
        errorMsg += "City is invalid.\n";   
    }
    if(!postalRegex.test(postal.value)) {
        errorMsg += "Postal code is invalid.\n";
    }
    if(!feedbackRegex.test(feedback.value)) {
        errorMsg += "Your feedback is invalid. " +
        "Your response must not exceed 300 characters," +
        "and can only contain alphanumeric characters, " +
        "as well as '' & ! , . -' special characters.";
    }

    // Check for errors
    if(errorMsg == "") {
        // If no errors, return true - submit form
        return true;
    }
    else {
        // Displays applicable errors in browser alert
        alert(errorMsg);
        // Since there are errors, return false - form is not submitted
        alert("Form was not submitted.");
        return false;
    }
}