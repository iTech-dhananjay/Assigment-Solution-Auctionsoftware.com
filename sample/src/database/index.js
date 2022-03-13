const mysql = require('mysql');
const util = require('util');
const dbConfig = require('./config')

const connection = mysql.createPool({
    connectionLimit : 10,
    host     : dbConfig.HOST,
    user     : dbConfig.USER,
    password : dbConfig.PASSWORD,
    database : dbConfig.DB
});

const dbQuery = util.promisify(connection.query).bind(connection)

module.exports = {
    connection,
    dbQuery
}