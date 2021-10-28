const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email:{type:String, unique:true,dropDups:true,required:true},
        password: {type:String, unique:true,dropDups:true,required:true},
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