const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const User = require('../models/user');
const Product = require('../models/product');
const ObjectId = require('mongoose').ObjectId;

router.get('/', async function (req, res) {
    var id = req.session.passport.user;
    var user = await User.findById(id);
    res.render('cart',{cart:user.cart});
})
router.post('/add', async function (req, res) {
    console.log(req.body);
    var id = req.session.passport.user;
    var product = await Product.findOne({ productCode: req.body.code });
    console.log("->>>>>>>>product : "+product);
    var user = await User.findOne({ _id: id });
    var item = {
        productCode: req.body.code,
        productname: product.name,
        quantity: req.body.quantity,
        price: product.price,
        image: product.images[0]
    };

    var carts = user.cart;
    var check = false ;
    carts.forEach(element => {
        if(element.productCode==req.body.code){
            element.quantity+=parseInt(req.body.quantity);
            check = true;
            return;
        }
    });
    if(check == false){
    carts.push(item);
    }
    console.log("----> cart :"+carts)
    try {
        await User.updateOne({ _id: id }, {
            $set: {
                email: user.email,
                password: user.password,
                firstname: user.firstname,
                lastname: user.lastname,
                credential: user.credential,
                phone: user.phone,
                address: user.address,
                shippingAddress: user.shippingAddress,
                cart: carts
            }
        }).exec()
        res.send("add suscess!");
    } catch (error) {
        console.log(error)
        res.send(error);
    }
})
module.exports = router;