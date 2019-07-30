const express = require('express');
const router = express.Router();
const merchantController = require('../app/controllers/merchant-controller');

router.get('/:id', (req, res) => {
    merchantController.getMerchant(req, res);   
});

router.post('/', (req, res) => {
    merchantController.create(req, res);    
});
module.exports = router;