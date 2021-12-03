const users = require('../models/users')
const passport = require('passport')
const userCtrl = {}

userCtrl.renderSignUpForm = (req, res) => {
    res.render("users/signup")
}

userCtrl.signup = async (req,res)=>{
    //console.log(req.body)
    const errors =[]
    const {name,email,password,confirm_password}= req.body
    if (password != confirm_password){
        errors.push({text:'passwords do not match'})
    }
    if (password.length < 4){
        errors.push({text:'passwords must be least 4 characters'})
    }
    if (errors.length > 0){
        res.render('users/signup',{errors,name,email})
    }else{
        const emailUser = await users.findOne({email})
        if (emailUser){
           req.flash('error_msg',"The email is already exist")
           res.redirect('/users/signup') 
        }else{
            const newUser = new users({name,email,password})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg','You are registered')
            res.redirect('/users/signin')
        }
    }
}

userCtrl.renderSignInForm = (req, res) => {
    res.render("users/signin")
}

userCtrl.signin = passport.authenticate("local",{
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true,
    successFlash: 'welcome'

})

userCtrl.logout= (req,res)=>{
    req.logout()
    req.flash('success_msg','sesion terminada')
    res.redirect('/users/signin')
}

module.exports = userCtrl

