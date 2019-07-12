const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/product-controller');

router.get('/', (req, res) => {
    productController.get(req, res);   
});

router.get('/:type', (req, res) => {
    productController.getByType(req, res); 
});

router.get('/:type/:id', (req, res) => {
    
});

router.post('/:type', (req, res) => {
    productController.create(req, res);    
});
module.exports = router;