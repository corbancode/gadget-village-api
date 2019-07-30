const productFavoriteModel = require('../../db/models/product-favorite-model');
const Fawn = require('fawn');
Fawn.init(productFavoriteModel.ProductFavorite);

async function getProductFavorites(pageNumber = 1, pageSize = 10) {
    const products = productFavoriteModel.ProductFavorite
                                .find()
                                .skip((pageNumber - 1) * pageSize)
                                .limit(pageSize)
                                .sort({created_at: -1})
                                .populate('user');

    return await products;
}

async function favoriteProduct(user_id, product_id) {
    const product = new productFavoriteModel.ProductFavorite({
        user: user_id, 
        product: product_id
    });

    return await product.save();
}

async function unfavoriteProduct(user_id, product_id) {
    const result = productFavoriteModel.ProductFavorite.findOneAndRemove({user: user_id, product: product_id});
    return await result;
}

module.exports.getProductFavorites = getProductFavorites;
module.exports.favoriteProduct = favoriteProduct;
module.exports.unfavoriteProduct = unfavoriteProduct;