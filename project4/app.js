const express = require('express')
const parser = require('body-parser')
const path = require('path')

const errorController = require('./controllers/error')
const db = require('./util/database')

const adminRouter = require('./router/admin')
const shopRouter = require('./router/shop')

const app = express()

app.set('view engine', 'ejs');
app.set('views', 'view');

db.execute('SELECT * FROM products')
    .then( results => {
        console.log(results[0])
    })
    .catch(err => {
        console.log(err)
    })

app.use(parser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(adminRouter)
app.use(shopRouter)
app.use(errorController.getError)

app.listen(3000)
