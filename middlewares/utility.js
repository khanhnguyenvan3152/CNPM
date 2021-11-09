const Header = require('../models/header');
const Category = require('../models/category');
const Product = require('../models/product');
module.exports = {
    getHeaderData : async function(req,res,next){
        let data = await Header.find().exec();
        res.locals.header = data;
        next();
    },
    getCategories: async function(req,res,next){
        let data = await Category.find().exec();
        res.locals.categories = data;
        console.log(data);
        next();
    },
    getBrands: async function(req,res,next){
        let data = await Product.distinct("brand");
        res.locals.brand = data;
        next();
    }
}