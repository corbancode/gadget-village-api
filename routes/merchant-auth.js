const express = require('express');
const router = express.Router();
const merchantAuthController = require('../app/controllers/merchant-auth-controller');

router.post('/session', (req, res) => {
    merchantAuthController.createSession(req, res);   
});

router.delete('/session', (req, res) => {
    merchantAuthController.deleteSession(req, res);   
});

router.post('/password/reset', (req, res) => {
    merchantAuthController.passwordReset(req, res); 
});

router.post('/reset/password', (req, res) => {
    merchantAuthController.resetPassword(req, res);    
});

router.post('/confirm', (req, res) => {
    merchantAuthController.update(req, res);    
});
module.exports = router;