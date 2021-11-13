const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');

router.get('/', async function (req, res) {
    if (req.isAuthenticated())
    {
        let id = req.user._id;
        console.log(req.session.user)
        let user = await User.findById(id).exec();
        res.render('cart',{cart:user.cart});
    }
    else{
       res.redirect('/auth/login');
    }
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
                // email: user.email,
                // password: user.password,
                // firstname: user.firstname,
                // lastname: user.lastname,
                // credential: user.credential,
                // phone: user.phone,
                // address: user.address,
                // shippingAddress: user.shippingAddress,
                cart: carts
            }
        }).exec()
        res.send("add suscess!");
    } catch (error) {
        console.log(error)
        res.send(error);
    }
})

router.get('/delete/:productCode',async function(req,res,next){
    try {
        await User.updateOne({_id:req.session.user},{$pull:{cart:{productCode:productCode}}},{multi:true})
        res.redirect('/cart');
    }
    catch(err){
        console.log(err)
    }
})
module.exports = router;