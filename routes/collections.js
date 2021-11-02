var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.redirect('/collections/all');
})
router.get('/all',(req,res)=>{
    res.render('collections',{layout:true});
})

module.exports = router;