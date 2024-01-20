const mysql = require('mysql2')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "techtrek24",
    port: 3306
})

module.exports = db;