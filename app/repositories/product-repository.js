const productModel = require('../../db/models/product-model');
const {uploadProductAvatars, deleteProductAvatars} = require('../utils/file-uploader');

async function getProducts(pageNumber = 1, pageSize = 10) {
    const products = productModel.Product
                                .find()
                                .skip((pageNumber - 1) * pageSize)
                                .limit(pageSize)
                                .sort({created_at: -1})
                                .populate(['merchant', 'merchant_admin', 'category', 'sub_category']);

    return await products;
}

async function getProduct(id) {
    const product = productModel.Product
                                .findById(id)
                                .populate(['merchant', 'merchant_admin', 'category', 'sub_category']);

    return await product;
}

async function getProductsByType(type, pageNumber = 1, pageSize = 10) {
    const products = productModel.Product
                                .find({ type: type })
                                .skip((pageNumber - 1) * pageSize)
                                .limit(pageSize)
                                .sort({created_at: -1})
                                .populate(['merchant', 'merchant_admin', 'category', 'sub_category']);

    return await products;
}

async function createProduct(params, files) {
    const avatars = await uploadProductAvatars(files);
    params.avatars = avatars;
    const product = new productModel.Product(params);

    return product.save();
    
}

async function updateProduct(id, params) {
    const product = await productModel.Product.findById(id);
    if (product) {
        product.set(params);
        return await product.save();
    } else {
        reject('Product not found!');
    }
}

async function deactivateProduct(id) {
    const product = productModel.Product.findByIdAndUpdate(id, {
        $set: {
            active: false
        }
    }, {new: true});
    return await product;
}

async function deleteProduct(id) {
    const product = productModel.Product
                                .findById(id)
    const result = await product;
    deleteProductAvatars(result.avatars);
    const result = productModel.Product.findByIdAndRemove(id);
    return await result;
}

module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.getProduct = getProduct;
module.exports.getProducts = getProducts;
module.exports.getProductsByType = getProductsByType;