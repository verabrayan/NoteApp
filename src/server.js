const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session');
const passport = require('passport');



const app = express();
require('./config/passport')
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
app.use(methodOverride('_method'))
app.use(express.json())
app.use(session({
    secret:'12345',
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


//global variables
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error=req.flash('error')
    res.locals.user =req.user || null
    next()
})

//Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/users.routes'))

//static files
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app