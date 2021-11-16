const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productCode: String,
    quantity: Number,
    price: Number,
    name:String,
    brand: String,
    features: Object({
        width:Number,
        height:Number,
        weight:Number,
    }),
    colors: Array,
    options: Array,
    group: String,
    type: String,
    tags: Array,
    images: Array,
    description:String,
    view:Number
},{timestamps:true})

module.exports = mongoose.model('product',ProductSchema)