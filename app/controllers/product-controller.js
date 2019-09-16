const {validateCreateProduct, validateUpdateProduct} = require('../utils/validators/product-validators');
const {successResponseMsg, errorResponseMsg} = require('../utils/response');
const {productResponseMessages} = require('../utils/response-messages');
const productRepository = require('../repositories/product-repository');

async function create(req, res) {
    validateCreateProduct(req.body).then((succ) => {
        const product = req.body;
        product.merchant_admin = req.user._id;
        product.merchant = req.user.merchant;
        productRepository.createProduct(product).then((data) => {
            successResponseMsg(res, productResponseMessages.productCreated, data);
        }, (err) => {
            const errorMessage = err.errors ? err.errors[Object.keys(err.errors)[0]]['message'] : err.message;
            errorResponseMsg(res, 200, errorMessage);
        }).catch((err) => {
            const errorMessage = err.errors ? err.errors : err.message;
            errorResponseMsg(res, 200, errorMessage);
        });
        
    }, (err) => {
        errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        errorResponseMsg(res, 400, err.message);
    });
}

async function update(req, res) {
    validateUpdateProduct(req.body).then((succ) => {
        const product = req.body;
        productRepository.updateProduct(req.params.id, product).then((data) => {
            successResponseMsg(res, productResponseMessages.productUpdated, data);
        }, (err) => {
            errorResponseMsg(res, 200, err.message);
        });
        
    }, (err) => {
        errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        errorResponseMsg(res, 400, err.message);
    });
}

async function remove(req, res) {
    productRepository.deleteProduct(req.params.id).then((data) => {
        if (data) {
            successResponseMsg(res, productResponseMessages.productDeleted);
        } else {
            errorResponseMsg(res, 200, productResponseMessages.productDeleteFailed);
        }
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

async function getProduct(req, res) {
    const params = req.params;
    productRepository.getProduct(params['id']).then((data) => {
        successResponseMsg(res, null, data);
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

async function getProducts(req, res) {
    const params = req.params;
    productRepository.getProducts(params['page'], params['page_size']).then((data) => {
        successResponseMsg(res, null, data);
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

async function getByType(req, res) {
    const params = req.params;
    productRepository.getProductsByType(params['type'], params['page'], params['page_size']).then((data) => {
    successResponseMsg(res, null, data);
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.getProduct = getProduct;
module.exports.getProducts = getProducts;
module.exports.getByType = getByType;