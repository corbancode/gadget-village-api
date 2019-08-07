const {mongoose} = require('../db-connection');

const categorySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 150,
        unique: true
    },
    icon: {
        type: String
    },
    active: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

const Category = mongoose.model('Category', categorySchema);

module.exports.Category = Category;