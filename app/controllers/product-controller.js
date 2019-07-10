const productValidator = require('../utils/validators/product-validators');
const response = require('../utils/response');
const responseMessages = require('../utils/response-messages');
const productRepository = require('../repositories/product-repository');

async function create(req, res) {
    productValidator.validateCreateProduct(req.body).then((succ) => {
        const product = {
            name: req.body.name,
            type: req.params.type
        };
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

module.exports.create = create;