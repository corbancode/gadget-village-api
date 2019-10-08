const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/auth-controller');
const auth = require('./middleware/auth');
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json();

router.post('/session', jsonParser, (req, res) => {
    authController.createSession(req, res);   
});

router.delete('/session', jsonParser, auth, (req, res) => {
    authController.deleteSession(req, res);   
});

router.post('/password/reset, jsonParser', (req, res) => {
    authController.passwordReset(req, res); 
});

router.post('/reset/password', jsonParser, (req, res) => {
    authController.resetPassword(req, res);    
});

router.post('/confirm', jsonParser, (req, res) => {
    authController.update(req, res);    
});
module.exports = router;