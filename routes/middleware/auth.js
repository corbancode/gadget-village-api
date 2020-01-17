const jwt = require('jsonwebtoken');
const config = require('config');
const {errorResponseMsg} = require('../../app/utils/response');
const {authResponseMessages} = require('../../app/utils/response-messages');
const {findToken} = require('../../app/repositories/auth-repository');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) errorResponseMsg(res, 401, authResponseMessages.authorisationFailed);
    try {
        const decoded = jwt.verify(token, config.get('jwt.secret_key'));
        findToken(decoded._id, token).then((user) => {
            if (!user) errorResponseMsg(res, 401, authResponseMessages.invalidAuthorisationToken);
            req.user = user;
            req.token = token;
            next();
        }).catch((err) => {
            errorResponseMsg(res, 401, authResponseMessages.invalidAuthorisationToken);
        })
    } catch (error) {
        errorResponseMsg(res, 401, authResponseMessages.invalidAuthorisationToken);
    }
    
}