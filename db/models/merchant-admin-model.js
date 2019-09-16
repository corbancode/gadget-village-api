const {mongoose} = require('../db-connection');
const jwt = require('jsonwebtoken');
const config = require('config');

const merchantAdminSchema = new mongoose.Schema({
    fullname: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 150
    },
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: 5,
        maxlength: 256
    },
    phone_number: {
        type: String,
        match: /^[0]+[0-9]{10}$/,
        trim: true,
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    merchant: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Merchant',
        required: true
    },
    display_picture: {type: String},
    password_reset_token: {type: String},
    confirmation_token: {type: String},
    tokens: {
        type: Array,
        default: []
    },
    active: {type: Boolean, default: true},
    is_super_admin: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

merchantAdminSchema.methods.generateAuthToken = function() {
    const payload = {
        _id: this._id,
        fullname: this.fullname,
        is_super_admin: this.is_super_admin
    }
    const token = jwt.sign(payload, config.get('jwt.secret_key'), {expiresIn: config.get('jwt.expiresIn')});
    this.saveAuthToken(token);
    return token;
}

merchantAdminSchema.methods.saveAuthToken = function(token) {
    const userTokens = this.tokens;
    userTokens.push(token);
    this.set({
        tokens: userTokens 
    });
    return this.save();
}

merchantAdminSchema.methods.removeAuthToken = function(token) {
    const userTokens = this.tokens;
    userTokens = userTokens.filter((value) => {
        return token != value;
    });
    this.set({
        tokens: userTokens 
    });
    return this.save();
}

const MerchantAdmin = mongoose.model('MerchantAdmin', merchantAdminSchema);

module.exports.MerchantAdmin = MerchantAdmin;