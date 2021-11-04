const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/:productCode',async (req,res,next)=>{
    let productCode = req.params.productCode;
    try{
        let product = await Product.find({productCode:productCode}).exec();
        res.render('detail',{product:product})
    }
    catch(err){
        console.log(err)
        res.send('Error')
    }
    
})

module.exports = router;