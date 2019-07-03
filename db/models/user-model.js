const mongoose = require('../db-connection');

const userSchema = new dbConnection.mongoose.Schema({
    fullname: String,
    username: String,
    password: String,
    email: String,
    date_of_birth: Date,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

const User = dbConnection.mongoose.model('User', userSchema);

module.exports.User = User;