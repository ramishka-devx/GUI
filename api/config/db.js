const mysql = require("mysql");
const util = require("util");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER1,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Handle connection errors
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1);
  } else {
    console.log("Connected to the database successfully!");
  }
});

// Promisify query and transaction functions
db.query = util.promisify(db.query);
db.beginTransaction = util.promisify(db.beginTransaction);
db.commit = util.promisify(db.commit);
db.rollback = util.promisify(db.rollback);

module.exports = db;
