const Header = require('../models/header');
const Category = require('../models/category');
const Product = require('../models/product');
const User = require('../models/user')
module.exports = {
    getHeaderData : async function(req,res,next){
        let data = await Header.find().exec();
        res.locals.header = data;
        next();
    },
    getCategories: async function(req,res,next){
        let data = await Category.find().exec();
        res.locals.categories = data;
        next();
    },
    getCartInfo: async function(req,res,next){
        if(req.isAuthenticated() ==true){
            let uid = req.session.passport.user;
            const result = await User.findOne({_id:uid}).exec();
            res.locals.cart = result.cart;
        }
        next();
    },
    getSimilarProduct: async function(req,res,next){
        let productCode = req.params.productCode;
        let product = await Product.find({productCode:productCode});
        let similarProducts = await Product.find({type:product[0].type}).where("productCode").ne(product[0].productCode).limit(4).exec();
        res.locals.similarProducts = similarProducts;
        next();
    },
    getBrands: async function(req,res,next){
        let data = await Product.distinct("brand");
        res.locals.brand = data;
        next();
    }
}