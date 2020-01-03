const config = require('config');
const { logger } = require('../app/utils/logger');

module.exports = function () {
    if (!config.get('jwt.secret_key')) {
        throw new Error('FATAL ERROR: Jwt secret key is undefined!');
    } else if (!config.get('db.password')) {
        throw new Error('FATAL ERROR: Database password is undefined!');
    }
}