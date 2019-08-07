const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/category-controller');

router.get('/', (req, res) => {
    categoryController.getCategories(req, res);   
});

router.post('/', (req, res) => {
    categoryController.create(req, res);    
});

router.delete('/:id', (req, res) => {
    categoryController.remove(req, res);    
});
module.exports = router;