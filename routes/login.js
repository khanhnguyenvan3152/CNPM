var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('authentication/login', { title: 'Express',layout:false});
});
router.post('/',function(req,res,next){
    console.log(req.body.username);
    console.log(req.body.password);
    res.render('index',{title:'Express'})
})
module.exports = router;
