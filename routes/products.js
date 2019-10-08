const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/product-controller');
const merchantAuth = require('./middleware/merchant-auth');
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const multer  = require('multer');
const upload = multer({ dest: 'tmp' });

router.get('/', jsonParser, (req, res) => {
    productController.getProducts(req, res);   
});

router.get('/:id', jsonParser, (req, res) => {
    productController.getProduct(req, res);   
});

router.get('/type/:type', jsonParser, (req, res) => {
    productController.getByType(req, res); 
});

router.post('/', upload.array('files', 4), merchantAuth, (req, res) => {
    productController.create(req, res);    
});

router.put('/:id', jsonParser, merchantAuth, (req, res) => {
    productController.update(req, res);    
});

router.delete('/:id', jsonParser, merchantAuth, (req, res) => {
    productController.remove(req, res);    
});
module.exports = router;