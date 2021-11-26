var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/info', function(req, res, next) {
  let user = req.user;
  res.render('profile',{user:user})
});
router.get('/orders',function(req,res){
  res.render('order')
})
module.exports = router;
