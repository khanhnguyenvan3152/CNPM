var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Header = require('../models/header')
const checkAuthenticated = require('../middlewares/authmiddleware');

/* GET home page. */
router.get('/', async (req, res) =>{
  console.log(req.session);
  console.log(req.session.id);
  console.log(req.user);
  res.render('index', { title: 'Express'});
});

router.get('/hdrender', async (req,res)=>{
    try{
      let header = await Header.find().exec();
      console.log(header);
      res.render("partials/header",{layout:false,header:header})
    }
    catch(err){
      console.log(err);
      res.status(400).send('error');
    }
})
module.exports = router;
