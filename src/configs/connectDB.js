require('dotenv').config();
const mysql = require('mysql2/promise');
// // create the connection to database

console.log("Creating connection pool...");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})


export default pool;