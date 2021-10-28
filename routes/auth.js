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
    res.render('authentication/register',{layout:false});
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
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err.code);
            if(err.code === 79) req.flash('message',"Email đã được sử dụng");
            res.redirect('auth/register',{layout:false});
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