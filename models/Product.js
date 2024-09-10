const mongoose = require ('mongoose');
const Firm = require('./Firm');
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    }
    ,price:{
        type:String,
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:['veg','non-veg']
        }]
    },
    image:{
        type:String,

    },bestseller:{
        type: Boolean, // Change this to Boolean
        default: false
    },description:{
        type:String
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }]
});
const product =mongoose.model('Product',productSchema)
module.exports=product;
