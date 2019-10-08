const express = require('express');
const router = express.Router();
const subCategoryController = require('../app/controllers/sub-category-controller');
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', jsonParser, (req, res) => {
    subCategoryController.getSubCategories(req, res);   
});

router.get('/category/:category_id', jsonParser, (req, res) => {
    subCategoryController.getCategorySubCategories(req, res);   
});

router.post('/', jsonParser, (req, res) => {
    subCategoryController.create(req, res);    
});

router.delete('/:id', jsonParser, (req, res) => {
    subCategoryController.remove(req, res);    
});
module.exports = router;