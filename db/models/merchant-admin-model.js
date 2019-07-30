const {mongoose} = require('../db-connection');

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
    active: {type: Boolean, default: true},
    is_super_admin: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

const MerchantAdmin = mongoose.model('MerchantAdmin', merchantAdminSchema);

module.exports.MerchantAdmin = MerchantAdmin;