const Product = require('../models/product');

const getProductById = async function(id){
    const product = await Product.findById(id);
    return product;
}

const getProductByType = async function(type){
    const products = await Product.find({type:type});
    return products;
}

const getProductByGroup = async function(group){
    const products = await Product.find({type:type});
    return products;
}

const Count = async function(){
    const count = await Product.countDocuments();
    return count;
}

const CountByType = async function(type){
    const count = await Product.countDocuments({type:type});
    return count;
}

const CountByGroup = async function(group){
    const count = await Product.countDocuments({group:group});
    return count;
}

//options contains {sortby,group,type,brand,pricerange}
//if you dont want to use one of these of options then dont put property name inside the options object.
const getProductsByFilter = async function(sortby, group, type,brand,price_filter){
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
    if (typeof price_filter != "undefined"){
        const slices = price_filter.split('-')
        console.log(slices);
        if(slices.length==1)
        {
            if(slices[0].length==6){
                filter['price'] = {$lt:slices[0]}
            }
            else
            {
                filter['price'] = {$gt:slices[0]}
            }
        }
        else{
            filter['price'] =  { $lt: parseInt(slices[1]), $gt: Number(slices[0]) } ;
        }
    }
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

module.exports = {
    getProductById,
    getProductByGroup,
    getProductByType,
    getProductsByFilter
}