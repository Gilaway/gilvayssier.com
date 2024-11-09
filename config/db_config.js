const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

console.log("DB User:", process.env.DB_USER);
console.log("DB Password:", process.env.DB_PASSWORD);
console.log("DB host:", process.env.DB_HOST);
console.log("DB name:", process.env.DB_NAME);

connection.connect(function (err) {
    if (err) {
        console.log('Connexion failed : ', err);
        return;
    }
    console.log('Connected to database...');
})

module.exports = connection;