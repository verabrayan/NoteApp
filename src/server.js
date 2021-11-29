const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path')



const app = express();

//settings
app.set('port',process.env.PORT || 8000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs',exphbs({
    defaultlayout: 'main',
    layoutsDir: path.join(app.get('views'),'layout'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}))
app.set('view engine','.hbs')

//middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())


//global variables


//Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))

//static files
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app