const subCategoryModel = require('../../db/models/sub-category-model');

async function getSubCategories(pageNumber = 1, pageSize = 20) {
    const categories = subCategoryModel.SubCategory
                                .find()
                                .skip((pageNumber - 1) * pageSize)
                                .limit(pageSize)
                                .sort({created_at: -1})
                                .populate('category');

    return await categories;
}

async function getCategorySubCategories(category, pageNumber = 1, pageSize = 20) {
    const categories = subCategoryModel.SubCategory
                                .find({category: category})
                                .skip((pageNumber - 1) * pageSize)
                                .limit(pageSize)
                                .sort({created_at: -1})
                                .populate('category');

    return await categories;
}

async function createSubCategory(params) {
    const category = new subCategoryModel.SubCategory(params);

    return await category.save();
}

async function removeSubCategory(sub_category_id) {
    const result = subCategoryModel.SubCategory.findOneAndRemove({_id: sub_category_id});
    return await result;
}

module.exports.getSubCategories = getSubCategories;
module.exports.getCategorySubCategories = getCategorySubCategories;
module.exports.createSubCategory = createSubCategory;
module.exports.removeSubCategory = removeSubCategory;