const {Router} = require('express');
const router = Router();
const userCtrl = require('../controllers/users.controllers')



// Routes
router.get("/users/signup",userCtrl.renderSignUpForm);

router.post("/users/signup",userCtrl.signup);

router.get("/users/signin",userCtrl.renderSignInForm);

router.post("/users/signin",userCtrl.signin);

router.get("/users/logout",userCtrl.logout);

module.exports = router