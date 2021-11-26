var express = require('express');
var router = express.Router();
var Outbill = require('../models/outbill')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/info', function(req, res, next) {
  let user = req.user;
  res.render('profile',{user:user})
});
router.get('/orders',async function(req,res){
  let userEmail = req.user.email;
  console.log(userEmail)
  let orders =await Outbill.find({"user.email":userEmail}).exec();
  console.log(orders);
  res.render('order',{orders:orders})
})
module.exports = router;
