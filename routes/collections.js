var express = require('express');
var router = express.Router();
const Product = require('../models/product');
router.get('/',(req,res)=>{
    let page = (typeof req.params.page !== "undefined")?req.params.page:1;
    res.redirect('/collections/all');
})
router.get('/all',(req,res)=>{
    let pageSize =16;
    let page = (typeof req.query.page !== "undefined")?req.query.page:1;
    let sortby = (typeof req.query.sort_by !== "undefined")?req.query.sort_by:"";
    let query = Product.find();
    console.log(sortby)
    switch(sortby){
        case "popular":
            query = query.sort({view:1})
            break;
        case "title-ascending":
            query = query.sort({name:1});
            break;
        case "title-descending":
            query = query.sort({name:-1});
            break;
        case "price-ascending":
            query = query.sort({price:1});
            break;
        case "price-descending":
            query = query.sort({price:-1});
            break;
        case "latest":
            query = query.sort({createdAt:1})
            break;
        case "oldest":
            query = query.sort({createdAt:-1})
            break;
    }
    query.skip((page-1)*pageSize).limit(pageSize).collation({locale:"vi",caseLevel:false}).exec((err,products)=>{
        Product.countDocuments((err,count)=>{
            if(err){
                res.send('Error');
            }
            else{
                res.render('collections',{
                    type: "all",
                    productList:products,
                    current:page,
                    sortby:sortby,
                    pages:Math.ceil(count/pageSize)
                });
            }
        })
    })
})
router.get('/vendors',(req,res,next)=>{
    let brand = req.query.q;
    console.log(brand); 
    let page = (typeof req.query.page !== "undefined")?req.query.page:1;
    let pageSize = 16;
    Product.find({brand:brand}).skip((page-1)*pageSize).collation({locale:"vi",caseLevel:false}).limit(pageSize).exec((err,products)=>{
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
                    pages:Math.ceil(count/pageSize)
                });
            }
        })
    })
})

router.get('/:productType',(req,res,next)=>{
    let pageSize =16;
    let type = req.params.productType;
    let page = (typeof req.query.page !== "undefined")?req.query.page:1;
    let sortby = (typeof req.query.sort_by !== "undefined")?req.query.sort_by:"";
    let query = Product.find({type:type});
    console.log(sortby)
    switch(sortby){
        case "title-ascending":
            query = query.sort({name:1});
            break;
        case "title-descending":
            query = query.sort({name:-1});
            break;
        case "price-ascending":
            query = query.sort({price:1});
            break;
        case "price-descending":
            query = query.sort({price:-1});
            break;
        case "latest":
            query = query.sort({createdAt:1})
            break;
        case "oldest":
            query = query.sort({createdAt:-1})
            break;
    }
    query.skip((page-1)*pageSize).limit(pageSize).exec((err,products)=>{
        Product.countDocuments({type:type},(err,count)=>{
            if(err){
                res.send('Error');
            }
            else{
                res.render('collections',{
                    type:type,
                    productList:products,
                    current:page,
                    sortby:sortby,
                    pages:Math.ceil(count/pageSize)
                });
            }
        })
    })
})
router.get('/:productGroup',(req,res,next)=>{
    let productGroup = req.params.productGroup;
    console.log
    let page = (typeof req.params.page !== "undefined")?req.params.page:1;
    let pageSize = 16;
    Product.find({group:productGroup}).skip((page-1)*pageSize).limit(pageSize).exec((err,products)=>{
        Product.countDocuments({group:productGroup},(err,count)=>{
            if(err){
                res.send('Error');
            }
            else{
                let breadcrumbType = productGroup;
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


