const productValidator = require('../utils/validators/product-validators');
const response = require('../utils/response');
const responseMessages = require('../utils/response-messages');
const productRepository = require('../repositories/product-repository');

async function create(req, res) {
    productValidator.validateCreateProduct(req.body).then((succ) => {
        const product = req.body;
        productRepository.createProduct(product).then((data) => {
            response.successResponseMsg(res, responseMessages.productResponseMessages.productCreated, data);
        }, (err) => {
            response.errorResponseMsg(res, 200, err.message);
        });
        
    }, (err) => {
        response.errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        response.errorResponseMsg(res, 400, err.message);
    });
}

async function update(req, res) {
    productValidator.validateUpdateProduct(req.body).then((succ) => {
        const product = req.body;
        productRepository.updateProduct(req.params.id, product).then((data) => {
            response.successResponseMsg(res, responseMessages.productResponseMessages.productUpdated, data);
        }, (err) => {
            response.errorResponseMsg(res, 200, err.message);
        });
        
    }, (err) => {
        response.errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        response.errorResponseMsg(res, 400, err.message);
    });
}

async function remove(req, res) {
    productRepository.deleteProduct(req.params.id).then((data) => {
        if (data) {
            response.successResponseMsg(res, responseMessages.productResponseMessages.productDeleted);
        } else {
            response.errorResponseMsg(res, 200, responseMessages.productResponseMessages.productDeleteFailed);
        }
    }, (err) => {
        response.errorResponseMsg(res, 200, err.message);
    });
}

async function getProduct(req, res) {
    const params = req.params;
    productRepository.getProduct(params['id']).then((data) => {
        response.successResponseMsg(res, null, data);
    }, (err) => {
        response.errorResponseMsg(res, 200, err.message);
    });
}

async function getProducts(req, res) {
    const params = req.params;
    productRepository.getProducts(params['page'], params['page_size']).then((data) => {
        response.successResponseMsg(res, null, data);
    }, (err) => {
        response.errorResponseMsg(res, 200, err.message);
    });
}

async function getByType(req, res) {
    const params = req.params;
    productRepository.getProductsByType(params['type'], params['page'], params['page_size']).then((data) => {
    response.successResponseMsg(res, null, data);
    }, (err) => {
        response.errorResponseMsg(res, 200, err.message);
    });
}

module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.getProduct = getProduct;
module.exports.getProducts = getProducts;
module.exports.getByType = getByType;