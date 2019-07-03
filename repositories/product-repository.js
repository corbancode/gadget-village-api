const productModel = require('../db/models/product-model');

async function createProduct(params) {
    const product = new productModel.Product({
        name: params.name,
        type: params.type
    });

    return await product.save();
    //return result;
}

module.exports.createProduct = createProduct;