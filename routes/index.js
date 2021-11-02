var express = require('express');
var router = express.Router();
const User = require('../models/user');
const checkAuthenticated = require('../middlewares/authmiddleware');

/* GET home page. */
router.get('/', async (req, res) =>{
  console.log(req.session);
  console.log(req.session.id);
  console.log(req.user);
  res.render('index', { title: 'Express'});
});

module.exports = router;
