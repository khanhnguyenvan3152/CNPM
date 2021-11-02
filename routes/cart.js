const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
router.get('/',async function(req,res){
    if(req.user)
    {
        let cart = await Cart.findById(req.user._id).exec();
        if(cart){
            res.render('/cart',{layout:false});
        }
    }
    res.render('cart');
})

module.exports = router;