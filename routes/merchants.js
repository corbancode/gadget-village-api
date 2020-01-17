const express = require('express');
const router = express.Router();
const merchantController = require('../app/controllers/merchant-controller');
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/:id', jsonParser, (req, res) => {
    merchantController.getMerchant(req, res);   
});

router.post('/', jsonParser, (req, res) => {
    merchantController.create(req, res);    
});
module.exports = router;