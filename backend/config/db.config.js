const fs = require('fs');

const caCertificate = fs.readFileSync("./DigiCertGlobalRootCA.crt.pem", "utf8");

const mysql = require('mysql')
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        ca: caCertificate,
        rejectUnauthorized: true
    }
})

module.exports = db;