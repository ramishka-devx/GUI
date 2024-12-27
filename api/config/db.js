const mysql =require('mysql')
const dotenv = require('dotenv');
dotenv.config();

// med
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_user1,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

module.exports = db;