const {mongoose} = require('../db-connection');

const merchantSchema = new mongoose.Schema({
    name: {
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
        lowercase: true
    },
    phone_number: {
        type: String,
        match: /^[0]+[0-9]{10}$/,
        trim: true
    },
    logo: {type: String, required:true},
    confirmation_token: {type: String},
    active: {type: Boolean, default: true},
    confirmed_at: {type: Date, default: null},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports.Merchant = Merchant;