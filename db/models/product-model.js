const dbConnection = require('../db-connection');

const productSchema = new dbConnection.mongoose.Schema({
    name: String,
    type: String,
    active: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

const Product = dbConnection.mongoose.model('Product', productSchema);

module.exports.Product = Product;
