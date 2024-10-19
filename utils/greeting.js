/*
Author: Ryan Angaangan
Student ID: 000783037
Date: October 17, 2024
Course: CPRG 210 - Web Application Development
Assignment: Node.js
*/

let greetingList = [
    "Welcome to 'The Bread Site!'",
    "Greetings, this is The Bread Site!",
    "Hello, you've reached The Bread Site!",
    "Salutations, you're browsing The Bread Site!",
    "Good day, you've found The Bread Site!",
    "¡Bienvenidos a El Sitio del Pan!",
    "Saludos, este es El Sitio del Pan!",
    "Hola, ¡has llegado a El Sitio del Pan!",
    "Saludos, ¡estás navegando en El Sitio del Pan!",
    "¡Buen día, has encontrado El Sitio del Pan!"
];

module.exports = {
    get randomGreeting() {
        return greetingList[Math.floor(Math.random() * 9) + 1];
    }
}