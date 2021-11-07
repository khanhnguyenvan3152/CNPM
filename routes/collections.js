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
                    type: "all",
                    productList:products,
                    current:page,
                    pages:Math.ceil(count/page)
                });
            }
        })
    })
})

// router.get('/:productGroup',(req,res,next)=>{
//     let productGroup = req.params.productGroup;
//     console.log
//     let page = (typeof req.params.page !== "undefined")?req.params.page:1;
//     let pageSize = 20;
//     Product.find({group:productGroup}).skip((page-1)*pageSize).limit(pageSize).exec((err,products)=>{
//         Product.countDocuments({group:productGroup},(err,count)=>{
//             if(err){
//                 res.send('Error');
//             }
//             else{
//                 let breadcrumbType = productGroup;
//                 res.render('collections',{
//                     type:breadcrumbType,
//                     productList:products,
//                     current:page,
//                     pages:Math.ceil(count/page)
//                 });
//             }
//         })
//     })
// })

router.get('/:productType',(req,res,next)=>{
    let productType = req.params.productType;
    let page = (typeof req.query.page !== "undefined")?req.query.page:1;
    let pageSize = 20;
    Product.find({type:productType}).skip((page-1)*pageSize).limit(pageSize).exec((err,products)=>{
        Product.countDocuments({type:productType},(err,count)=>{
            if(err){
                res.send('Error');
            }
            else{
                let breadcrumbType = productType;
                res.render('collections',{
                    type:breadcrumbType,
                    productList:products,
                    current:page,
                    pages:Math.ceil(count/page)
                });
            }
        })
    })
})


router.get('/vendors',(req,res,next)=>{
    let brand = req.query.q;
    console.log(q);
    let page = (typeof req.query.page !== "undefined")?req.query.page:1;
    let pageSize = 20;
    Product.find({brand:brand}).skip((page-1)*pageSize).limit(pageSize).exec((err,products)=>{
        Product.countDocuments({brand:brand},(err,count)=>{
            if(err){
                res.send('Error');
            }
            else{
                console.log(products.length)
                let breadcrumbType = brand;
                res.render('collections',{
                    type:breadcrumbType,
                    productList:products,
                    current:page,
                    pages:Math.ceil(count/page)
                });
            }
        })
    })
})
module.exports = router;