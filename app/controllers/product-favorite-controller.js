/* const {validateCreateProduct, validateUpdateProduct} = require('../utils/validators/product-favorite-validators');
const {successResponseMsg, errorResponseMsg} = require('../utils/response');
const {productFavoriteResponseMessages} = require('../utils/response-messages');
const productFavoriteRepository = require('../repositories/product-favorite-repository');

async function create(req, res) {
    validateCreateProduct(req.body).then((succ) => {
        const productFavorite = req.body;
        productFavoriteRepository.createProduct(productFavorite).then((data) => {
            successResponseMsg(res, productFavoriteResponseMessages.productFavoriteCreated, data);
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
        const productFavorite = req.body;
        productFavoriteRepository.updateProduct(req.params.id, productFavorite).then((data) => {
            successResponseMsg(res, productFavoriteResponseMessages.productFavoriteUpdated, data);
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
    productFavoriteRepository.deleteProduct(req.params.id).then((data) => {
        if (data) {
            successResponseMsg(res, productFavoriteResponseMessages.productFavoriteDeleted);
        } else {
            errorResponseMsg(res, 200, productFavoriteResponseMessages.productFavoriteDeleteFailed);
        }
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

async function getProduct(req, res) {
    const params = req.params;
    productFavoriteRepository.getProduct(params['id']).then((data) => {
        successResponseMsg(res, null, data);
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

async function getProducts(req, res) {
    const params = req.params;
    productFavoriteRepository.getProducts(params['page'], params['page_size']).then((data) => {
        successResponseMsg(res, null, data);
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

async function getByType(req, res) {
    const params = req.params;
    productFavoriteRepository.getProductsByType(params['type'], params['page'], params['page_size']).then((data) => {
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
module.exports.getByType = getByType; */