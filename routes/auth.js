const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/auth-controller');

router.get('/', (req, res) => {
    authController.getProducts(req, res);   
});

router.get('/:id', (req, res) => {
    authController.getProduct(req, res);   
});

router.get('/type/:type', (req, res) => {
    authController.getByType(req, res); 
});

router.post('/', (req, res) => {
    authController.create(req, res);    
});

router.put('/:id', (req, res) => {
    authController.update(req, res);    
});

router.delete('/:id', (req, res) => {
    authController.remove(req, res);    
});
module.exports = router;