const mysql = require('mariadb');

const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'backend',
    connectionLimit: 10

}

const pool = mysql.createPool(config)

module.exports = pool;