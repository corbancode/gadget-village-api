const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/category-controller');
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', jsonParser, (req, res) => {
    categoryController.getCategories(req, res);   
});

router.post('/', jsonParser, (req, res) => {
    categoryController.create(req, res);    
});

router.delete('/:id', jsonParser, (req, res) => {
    categoryController.remove(req, res);    
});
module.exports = router;