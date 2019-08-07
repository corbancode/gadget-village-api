const {mongoose} = require('../db-connection');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 150,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    },
    icon: {
        type: String
    },
    active: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports.SubCategory = SubCategory;