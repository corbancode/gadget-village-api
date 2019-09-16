const {mongoose} = require('../db-connection');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 150
    },
    username: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 50
    },
    password: String,
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
    date_of_birth: Date,
    display_picture: {type: String},
    password_reset_token: {type: String},
    confirmation_token: {type: String},
    tokens: {
        type: Array,
        default: []
    },
    active: {type: Boolean, default: true},
    confirmed_at: {type: Date, default: null},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

userSchema.methods.generateAuthToken = function() {
    const payload = {
        _id: this._id,
        fullname: this.fullname,
        email: this.email
    }
    const token = jwt.sign(payload, config.get('jwt.secret_key'), {expiresIn: config.get('jwt.expiresIn')});
    this.saveAuthToken(token);
    return token;
}

userSchema.methods.saveAuthToken = function(token) {
    const userTokens = this.tokens;
    userTokens.push(token);
    this.set({
        tokens: userTokens 
    });
    return this.save();
}

userSchema.methods.removeAuthToken = function(token) {
    const userTokens = this.tokens;
    userTokens = userTokens.filter((value) => {
        return token != value;
    });
    this.set({
        tokens: userTokens 
    });
    return this.save();
}

const User = mongoose.model('User', userSchema);

module.exports.User = User;