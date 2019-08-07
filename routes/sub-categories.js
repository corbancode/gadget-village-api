const express = require('express');
const router = express.Router();
const subCategoryController = require('../app/controllers/sub-category-controller');

router.get('/', (req, res) => {
    subCategoryController.getSubCategories(req, res);   
});

router.get('/category/:category_id', (req, res) => {
    subCategoryController.getCategorySubCategories(req, res);   
});

router.post('/', (req, res) => {
    subCategoryController.create(req, res);    
});

router.delete('/:id', (req, res) => {
    subCategoryController.remove(req, res);    
});
module.exports = router;