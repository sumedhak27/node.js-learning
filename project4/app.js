const express = require('express')
const parser = require('body-parser')
const path = require('path')

const errorController = require('./controllers/error')


const adminRouter = require('./router/admin')
const shopRouter = require('./router/shop')

const app = express()

app.set('view engine', 'ejs');
app.set('views', 'view');

app.use(parser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(adminRouter)
app.use(shopRouter)
app.use(errorController.getError)

app.listen(3000)
