const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/product-controller');

router.get('/', (req, res) => {
    productController.getProducts(req, res);   
});

router.get('/:id', (req, res) => {
    productController.getProduct(req, res);   
});

router.get('/type/:type', (req, res) => {
    productController.getByType(req, res); 
});

router.post('/', (req, res) => {
    productController.create(req, res);    
});

router.put('/:id', (req, res) => {
    productController.update(req, res);    
});

router.delete('/:id', (req, res) => {
    productController.remove(req, res);    
});
module.exports = router;