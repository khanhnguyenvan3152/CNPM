var express = require('express');
var router = express.Router();
const db = require('../models/db');
const UserModel = require('../models/user');
/* GET home page. */
router.get('/', async function(req, res, next) {
  const user = await UserModel.findOne();
  res.render('index', { title: 'Express' , user: user});
});

module.exports = router;
