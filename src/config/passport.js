const passport = require("passport");

const localStrategy = require('passport-local').Strategy
const User = require('../models/users')

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'

}, async (email, password, done) => {
    const user = await User.findOne({email})
    //console.log(user)
    if (!user){
        return done(null,false,{message:'not user found'})
    }else{
        const result = await user.matchPassword(password)
        //console.log(result)
        if (result){
            return done(null,user)
        }else{
            return done(null,false, {message:'incorrect password'})
        }     
    }
}))

passport.serializeUser((user,done) =>{
    done(null, user.id)
})

passport.deserializeUser((id, done) =>{
    User.findById(id, (err,user) =>{
        done(err, user)
    })
})

module.exports= passport