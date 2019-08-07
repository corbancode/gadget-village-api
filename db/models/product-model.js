const {mongoose} = require('../db-connection');
const config = require('config');

const productTypes = config.get('productTypes');
const paymentMethods = config.get('paymentMethods');
const productSchema = new mongoose.Schema({
    type: {
        type: String, 
        required: true,
        enum: productTypes,
        lowercase: true
    },
    title: {
        type: String, 
        required: true,
        maxlength: 256
    },
    description: {
        type: String, 
        required: true,
        minlength: 25
    },
    price: {type: Number, required: true},
    avatars: {
        type: Array, 
        validate: {
            validator: function(value) {
                return value && value.length > 0;
            },
            message: 'A product should have at least one image.'
        }
    },
    no_of_favorites: {
        type: Number,
        default: 0
    },
    payment_method: {
        type: String, 
        required: true,
        enum: paymentMethods
    },

    
    merchant: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Merchant', 
        required: true
    },
    merchant_admin: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MerchantAdmin', 
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true
    },
    sub_category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'SubCategory', 
        required: true
    },

    // For Auctions
    bidding_start_date: {type: Date, required: function() {
        return this.type === 'auction'
    }},
    bidding_end_date: {type: Date, required: function() {
        return this.type === 'auction'
    }},
    bidding_increment: {type: Number, required: function() {
        return this.type === 'auction'
    }},

    active: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

const Product = mongoose.model('Product', productSchema);

module.exports.Product = Product;
