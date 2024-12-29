const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

// med
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER1, // Fixed case for consistency
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Handle connection errors
db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        process.exit(1); // Exit the process if the connection fails
    } else {
        console.log("Connected to the database successfully!");
    }
});

module.exports = db;
