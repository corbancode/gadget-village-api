
const {errorResponseMsg} = require('../../app/utils/response');
const {errorResponseMessages} = require('../../app/utils/response-messages');

module.exports = function(err, req, res, next) {
    errorResponseMsg(res, 500, errorResponseMessages.internalServerError);
}