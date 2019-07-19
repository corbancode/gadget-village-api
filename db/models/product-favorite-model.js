const {mongoose} = require('../db-connection');

const productFavoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product'
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

const ProductFavorite = mongoose.model('ProductFavorite', productFavoriteSchema);

module.exports.ProductFavorite = ProductFavorite;