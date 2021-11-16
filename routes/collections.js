var express = require('express');
var router = express.Router();
const Product = require('../models/product');

const productFilter = async function (sortby, type,group, brand, specificPrice) {
    let filter = {};
    if (typeof type !=="undefined" && type !== "all") filter['type'] = type;
    if (typeof group !== "undefined") {
        if(group !== "all")
        {
            filter['group'] = group;
        }
    }
    if(type == "all" || group == "all") filter = {};
    if (typeof brand != "undefined") filter['brand'] = brand;
    if (typeof specificPrice != "undefined") filter['price'] = { price: { $lt: specificPrice.lo, $ge: specificPrice.hi } };
    console.log(filter);
    let query = Product.find(filter);
    let count = await Product.countDocuments(filter);
    switch (sortby) {
        case "popular":
            query = query.sort({ view: -1 })
            break;
        case "title-ascending":
            query = query.sort({ name: 1 });
            break;
        case "title-descending":
            query = query.sort({ name: -1 });
            break;
        case "price-ascending":
            query = query.sort({ price: 1 });
            break;
        case "price-descending":
            query = query.sort({ price: -1 });
            break;
        case "latest":
            query = query.sort({ createdAt: 1 })
            break;
        case "oldest":
            query = query.sort({ createdAt: -1 })
            break;
    }
    return { query, count };
}

router.get('/', (req, res) => {
    res.redirect('/collections/all');
})


router.get('/all', async (req, res) => {
    let type = "all";
    let pageSize = 16;
    let brand = (typeof req.query.brand !== "undefined") ? req.query.brand : "";
    let page = (typeof req.query.page !== "undefined") ? req.query.page : 1;
    let sortby = (typeof req.query.sort_by !== "undefined") ? req.query.sort_by : "";
    let { query, count } = (await productFilter(sortby, type, brand));
    query
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .collation({ locale: "vi", caseLevel: false })
        .exec((err, products) => {
            if (err) {
                res.send('Error');
            }
            else {
                res.render('collections', {
                    type: "all",
                    brand: brand,
                    productList: products,
                    current: page,
                    sortby: sortby,
                    pages: Math.ceil(count / pageSize)
                });
            }

        })
})
router.get('/vendors', async (req, res, next) => {
    let pageSize = 16;
    let brand = (typeof req.query.brand !== "undefined") ? req.query.brand : "";
    let page = (typeof req.query.page !== "undefined") ? req.query.page : 1;
    let sortby = (typeof req.query.sort_by !== "undefined") ? req.query.sort_by : "";
    let { query, count } = (await productFilter(sortby, type, brand));
    query
        .skip((page - 1) * pageSize)
        .collation({ locale: "vi", caseLevel: false })
        .limit(pageSize)
        .exec((err, products) => {
            if (err) {
                res.send('Error');
            }
            else {
                let breadcrumbType = brand;
                res.render('collections', {
                    type: breadcrumbType,
                    productList: products,
                    current: page,
                    pages: Math.ceil(count / pageSize)
                });
            }
        })
})

router.get('/:productType', async (req, res, next) => {
    let pageSize = 16;
    let brand = (typeof req.query.brand !== "undefined") ? req.query.brand : undefined;
    let type = req.params.productType;
    let page = (typeof req.query.page !== "undefined") ? req.query.page : 1;
    let sortby = (typeof req.query.sort_by !== "undefined") ? req.query.sort_by : "";
    let { query, count } = await productFilter(sortby,type,undefined, brand,undefined);
    query.skip((page - 1) * pageSize).limit(pageSize).exec((err, products) => {
        if (count == 0) {
            next();
            return;
        }
        if (err) {
            res.send('Error');
        }
        else {
           
            res.render('collections', {
                type: type,
                productList: products,
                current: page,
                sortby: sortby,
                pages: Math.ceil(count / pageSize)
            });
        }
    })

})
router.get('/:productGroup', async (req, res,next) => {
    let brand = (typeof req.query.brand !== "undefined") ? req.query.brand : undefined;
    let group = req.params.productGroup;
    console.log(group)
    let page = (typeof req.query.page !== "undefined") ? req.query.page : 1;
    let sortby = (typeof req.query.sort_by !== "undefined") ? req.query.sort_by : "";
    let specificPrice =  req.query.specificPrice;
    let pageSize = 16;
    let {query,count} = await productFilter(sortby,undefined,group ,brand, undefined)
    console.log(group)
    query.skip((page - 1) * pageSize).limit(pageSize).exec((err, products) => {
            if (err) {
                res.send('Error');
            }
            else {
                let breadcrumbType = group;
                res.render('collections', {
                    type: breadcrumbType,
                    productList: products,
                    current: page,
                    sortby:sortby,
                    pages: Math.ceil(count / page)
                });
            }
        })

})


module.exports = router;


