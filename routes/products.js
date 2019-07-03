const express = require('express');
const router = express.Router();
const productValidator = require('../utils/validators/product-validators');
const response = require('../utils/response');
const responseMessages = require('../utils/response-messages');
const productRepository = require('../repositories/product-repository');

const products = [
    {id: 1, type: 'auction', name: 'Iphone 6, 32 gig rom'},
    {id: 2, type: 'for-sale', name: 'Iphone X'},
    {id: 3, type: 'auction', name: 'Homtom S16'},
    {id: 4, type: 'for-sale', name: 'Infinx Hot Note 3'},
    {id: 5, type: 'auction', name: 'Iphone 5'},
];
router.get('/:type', (req, res) => {
    res.send([1,2,3]);
});

router.get('/:type/:id', (req, res) => {
    const type = req.params.type;
    const id = req.params.id;
    const product = products.find((product) => {
        return product.id === parseInt(id) && product.type === type;
    });
    if (product) {
        res.send({status: 'success', data: product});
    }
    else {
        res.send({status: 'error', message: 'Product not found'})
    }
});

router.post('/:type', (req, res) => {
    productValidator.validateCreateProduct(req.body).then((succ) => {
        const product = {
            name: req.body.name,
            type: req.params.type
        };
        const newProduct = productRepository.createProduct(product);
        response.successResponseMsg(res, responseMessages.productResponseMessages.productCreated, newProduct);
        
    }, (err) => {
        response.errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        response.errorResponseMsg(res, 400, err.message);
    });
    
});
module.exports = router;