const mongoose = require('mongoose')
const vendors = require('./Vendor');
const products = require('./Product');
const firmSchema = new mongoose.Schema({
    firmname: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String,
        required: true
    },
    category: [{
        type: String,
        enum: ['veg', 'non-veg']
    }],
    region: [{
        type: String,
        enum: ['north-indian', 'south-indian', 'east-indian', 'west-indian']
    }],
    
    offer:{
        type: String,
        required: true


    },
    image: {
        type: String,
    },
    vendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

const Firm = mongoose.model('Firm', firmSchema);
module.exports = Firm;