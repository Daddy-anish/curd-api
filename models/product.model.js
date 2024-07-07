const mongoose = require('mongoose');

const ProductSchema =mongoose.Schema(
    {
        name : {
            type: String,
            required  : [true,"please enter product name"],
            
        },
        
        quantity : {
            type : Number,
            default : 0  
        },
        price : {
            type : Number,
            require : true,
            default : 0
        } , 
        image : {
            type : String,
            required : false
        },
           },
           {
            timestamps : true,
           }
);

const Product = mongoose.model("Product",ProductSchema)

module.exports = Product;