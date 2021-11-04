var express = require('express');
var router = express.Router();
const Product = require('../models/product');
router.get('/',(req,res)=>{
    let page = (typeof req.params.page !== "undefined")?req.params.page:1;
    res.redirect('/collections/all');
})
router.get('/all',(req,res)=>{
    let page = (typeof req.params.page !== "undefined")?req.params.page:1;
    let pageSize =20;
    Product.find().skip((page-1)*pageSize).limit(pageSize).sort({name:1}).collation({locale:"vi",caseLevel:false}).exec((err,products)=>{
        Product.countDocuments((err,count)=>{
            if(err){
                res.send('Error');
            }
            else{
                res.render('collections',{
                    productList:products,
                    current:page,
                    pages:Math.ceil(count/page)
                });
            }
        })
    })
})

router.get('/:producttype',(req,res,next)=>{
    let producttype = req.params.producttype;
    let page = (typeof req.params.page !== "undefined")?req.params.page:1;
    let pageSize = 20;
    Product.find({type:producttype}).skip((page-1)*pageSize).limit(pageSize).exec((err,products)=>{
        Product.countDocuments({type:producttype},(err,count)=>{
            if(err){
                res.send('Error');
            }
            else{
                res.render('collections',{
                    productList:products,
                    current:page,
                    pages:Math.ceil(count/page)
                });
            }
        })
    })
})
module.exports = router;