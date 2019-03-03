const express = require('express')

const mysql = require('mysql')

const app = express()

const bodyparser = require('body-parser')

app.use(bodyparser.json())

var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Funnyjokers9!',
    database: 'movies_database'
})

mysqlconnection.connect(err => {
    if(!err)
        console.log("Database is connected....")
    else
        console.log(err)
})

app.listen(3000, () => console.log('server is running..........'))
app.get('/products',(req, res, next) => {
    mysqlconnection.query('SELECT * FROM movies', (err,rows,fields) => {
        if(!err){
            console.log(rows)
        }
        else{
            console.log(err)
        }
    })
})