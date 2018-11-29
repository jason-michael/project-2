const mysql = require('mysql');
let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
}

connection.on('connect', () => {
    console.log(`--> Connected to database: ${connection.config.database}.`);
});

connection.on('error', err => {
    console.log('--> Connection error: ', err);
});

connection.connect();

module.exports = connection;
