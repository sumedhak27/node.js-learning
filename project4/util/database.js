const mysql = require('mysql2')

const pool =  mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_project',
    password: 'Funnyjokers9!'
})

module.exports = pool.promise();