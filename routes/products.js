const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/:productCode',async (req,res,next)=>{
    let productCode = req.params.productCode;
    try{
        let product = await Product.findOne({productCode:productCode}).exec();
        res.render('detail',{product:product})
    }
    catch(err){
        console.log(err)
        res.send('Error')
    }
    
})
router.get('/getAllProductByType/:type',async (req,res)=>{
    let type = req.params.type;
    try{
        let product = await Product.find({type:type}).limit(5).exec();
        res.json({product:product});
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})
module.exports = router;