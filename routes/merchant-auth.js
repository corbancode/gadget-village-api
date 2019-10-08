const express = require('express');
const router = express.Router();
const merchantAuthController = require('../app/controllers/merchant-auth-controller');
const merchantAuth = require('./middleware/merchant-auth');

const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/session', jsonParser, (req, res) => {
    merchantAuthController.createSession(req, res);   
});

router.delete('/session', jsonParser, merchantAuth, (req, res) => {
    merchantAuthController.deleteSession(req, res);   
});

router.post('/password/reset, jsonParser', (req, res) => {
    merchantAuthController.passwordReset(req, res); 
});

router.post('/reset/password', jsonParser, (req, res) => {
    merchantAuthController.resetPassword(req, res);    
});

router.post('/confirm', jsonParser, (req, res) => {
    merchantAuthController.update(req, res);    
});
module.exports = router;