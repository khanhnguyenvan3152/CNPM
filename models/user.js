const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email:{type:String,required:true},
        password: {type:String,required:true},
        firstname: String,
        lastname: String,
        credential:{type:String,default:""},
        phone:{type:String,default:""},
        address: {
            country:{type:String,default:""},
            city:{type:String,default:""},
            zipcode:{type:String,default:""},
            district:{type:String,default:""},
            street:{type:String,default:""}
        },
        shippingAddress:{
            city:{type:String,default:""},
            zipcode:{type:String,default:""},
            district:{type:String,default:""},
            street: {type:String,default:""}
        }
    }, 
    {timestamps:true}
)

module.exports = mongoose.model('user',UserSchema)