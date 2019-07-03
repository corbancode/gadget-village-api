const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');

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
    productController.create(req, res);    
});
module.exports = router;