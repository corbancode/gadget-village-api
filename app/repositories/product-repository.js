const productModel = require('../../db/models/product-model');


async function getProducts(pageNumber = 1, pageSize = 10) {
    const products = productModel.Product
                                .find()
                                .skip((pageNumber - 1) * pageSize)
                                .limit(pageSize)
                                .sort({created_at: -1});

    return await products;
}

async function getProduct(id) {
    const product = productModel.Product
                                .findById(id);

    return await product;
}

async function getProductsByType(type, pageNumber = 1, pageSize = 10) {
    const products = productModel.Product
                                .find({ type: type })
                                .skip((pageNumber - 1) * pageSize)
                                .limit(pageSize)
                                .sort({created_at: -1});

    return await products;
}

async function createProduct(params) {
    const product = new productModel.Product({
        name: params.name,
        type: params.type
    });

    return await product.save();
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
    const result = productModel.Product.findByIdAndRemove(id);
    return await result;
}

module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.getProduct = getProduct;
module.exports.getProducts = getProducts;
module.exports.getProductsByType = getProductsByType;