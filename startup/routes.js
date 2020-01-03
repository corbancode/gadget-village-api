const auth = require('../routes/auth');
const merchantAuth = require('../routes/merchant-auth');
const users = require('../routes/users');
const products = require('../routes/products');
const merchants = require('../routes/merchants');
const categories = require('../routes/categories');
const subCategories = require('../routes/sub-categories');
const error = require('../routes/middleware/error');
const redirect = require('../routes/middleware/redirect');

module.exports = function (app) {

    app.use(redirect);

    app.use('/api/v1/auth', auth);
    app.use('/api/v1/merchants/auth', merchantAuth);
    // app.use('/api/v1/users', users);
    app.use('/api/v1/products', products);
    app.use('/api/v1/merchants', merchants);
    app.use('/api/v1/categories', categories);
    app.use('/api/v1/sub-categories', subCategories);

    app.use(error);
}