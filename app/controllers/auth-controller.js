const {validateCreateSession, validatePasswordReset, validateResetPassword} = require('../utils/validators/auth-validator');
const {successResponseMsg,  sessionSuccessResponseMsg, errorResponseMsg} = require('../utils/response');
const {authResponseMessages} = require('../utils/response-messages');
const {findByEmail} = require('../repositories/auth-repository');
const bcrypt = require('bcrypt');
const {merchantView} = require('../utils/view');

async function createSession(req, res) {
    validateCreateSession(req.body).then((succ) => {
        const requestBody = req.body;
        findByEmail(requestBody.email).then((data) => {
            const result = bcrypt.compare(requestBody.password, data.password);
            if (result) {
                const token = data.generateAuthToken();
                sessionSuccessResponseMsg(res, authResponseMessages.sessionCreated, token, merchantView(data));
            } else {
                errorResponseMsg(res, 200, authResponseMessages.sessionCreateFailed);
            }
            
        }, (_err) => {
            console.log('not found')
            errorResponseMsg(res, 200, authResponseMessages.sessionCreateFailed);
        }).catch((err) => {
            const errorMessage = err.errors ? err.errors : err.message;
            errorResponseMsg(res, 200, errorMessage);
        });
        
    }, (err) => {
        errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        errorResponseMsg(res, 400, err.message);
    });
}

async function passwordReset(req, res) {
    validatePasswordReset(req.body).then((succ) => {
        const merchantAuth = req.body;
        merchantAuthRepository.createCategory(merchantAuth).then((data) => {
            successResponseMsg(res, authResponseMessages.passwordReset, data);
        }, (err) => {
            const errorMessage = err.errors ? err.errors[Object.keys(err.errors)[0]]['message'] : err.message;
            errorResponseMsg(res, 200, errorMessage);
        }).catch((err) => {
            const errorMessage = err.errors ? err.errors : err.message;
            errorResponseMsg(res, 200, errorMessage);
        });
        
    }, (err) => {
        errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        errorResponseMsg(res, 400, err.message);
    });
}

async function resetPassword(req, res) {
    validateResetPassword(req.body).then((succ) => {
        const merchantAuth = req.body;
        merchantAuthRepository.createCategory(merchantAuth).then((data) => {
            successResponseMsg(res, authResponseMessages.resetPassword, data);
        }, (err) => {
            const errorMessage = err.errors ? err.errors[Object.keys(err.errors)[0]]['message'] : err.message;
            errorResponseMsg(res, 200, errorMessage);
        }).catch((err) => {
            const errorMessage = err.errors ? err.errors : err.message;
            errorResponseMsg(res, 200, errorMessage);
        });
        
    }, (err) => {
        errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        errorResponseMsg(res, 400, err.message);
    });
}

async function deleteSession(req, res) {
    findByEmail(req.user.email).then((data) => {
        const token = data.removeAuthToken(req.token);
        sessionSuccessResponseMsg(res, authResponseMessages.sessionDeleted, token, merchantView(data));
    }).catch((err) => {
        const errorMessage = err.errors ? err.errors : err.message;
        errorResponseMsg(res, 200, errorMessage);
    });
}

module.exports.createSession = createSession;
module.exports.resetPassword = resetPassword;
module.exports.passwordReset = passwordReset;
module.exports.deleteSession = deleteSession;