const productModel = require('../../db/models/product-model');

async function createProduct(params) {
    const product = new productModel.Product({
        name: params.name,
        type: params.type
    });

    return await product.save();
}

async function getProducts() {
    const product = new productModel.Product.find();

    return await product;
}

async function getProductsByType(type) {
    const product = new productModel.Product.find({ type: type });

    return await product;
}

module.exports.createProduct = createProduct;
module.exports.getProducts = getProducts;
module.exports.getProductsByType = getProductsByType;