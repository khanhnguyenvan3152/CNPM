const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const initializePassport = require('../passport-config');
const {enforceAuthentication,forwardAuthentication} = require('../middlewares/auth');
const checkAuthentication = require('../middlewares/authmiddleware');
initializePassport(
    passport, 
    async function (email){
    let user = await User.findOne({email:email}).exec();return user;},
    async function (id){
        let user = await User.findById(id).exec();
        return user;
    }
)
router.get('/login',forwardAuthentication,function(req,res,next){
    res.render('authentication/login',{layout: false});
})

router.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/auth/login',
    failureFlash:true
}))

router.get('/register',function(req,res,next){
    let message = req.flash('message');
    res.render('authentication/register',{layout:false,message:message});
})

router.post('/register',async function(req,res,next){
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword
        });
        user.save()
        .then(result=>{
            console.log(result);
            res.redirect('/auth/login');
        })
        .catch(err=>{
            req.flash('message',err.errors);
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
    }
})

router.get('/logout',function(req,res,next){
    req.logOut();
    res.redirect('/');
})
module.exports = router;