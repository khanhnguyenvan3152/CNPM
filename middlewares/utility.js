const Header = require('../models/header');
const Category = require('../models/category');
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
    }
}