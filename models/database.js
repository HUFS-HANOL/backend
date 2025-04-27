const mysql = require("mysql2");
require('dotenv').config();


// 데이터베이스 연결
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});


module.exports = db;