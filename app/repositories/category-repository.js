const categoryModel = require('../../db/models/category-model');

async function getCategories(pageNumber = 1, pageSize = 20) {
    const categories = categoryModel.Category
                                .find()
                                .skip((pageNumber - 1) * pageSize)
                                .limit(pageSize)
                                .sort({created_at: -1});

    return await categories;
}

async function createCategory(params) {
    const category = new categoryModel.Category(params);

    return await category.save();
}

async function removeCategory(category_id) {
    const result = categoryModel.Category.findOneAndRemove({_id: category_id});
    return await result;
}

module.exports.getCategories = getCategories;
module.exports.createCategory = createCategory;
module.exports.removeCategory = removeCategory;