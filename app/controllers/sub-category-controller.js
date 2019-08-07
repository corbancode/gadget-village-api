const {validateCreateSubCategory} = require('../utils/validators/category-validator');
const {successResponseMsg, errorResponseMsg} = require('../utils/response');
const {subCategoryResponseMessages} = require('../utils/response-messages');
const subCategoryRepository = require('../repositories/sub-category-repository');

async function create(req, res) {
    validateCreateSubCategory(req.body).then((succ) => {
        const subCategory = req.body;
        subCategoryRepository.createSubCategory(subCategory).then((data) => {
            successResponseMsg(res, subCategoryResponseMessages.subCategoryCreated, data);
        }, (err) => {
            const errorMessage = err.errors ? err.errors[Object.keys(err.errors)[0]]['message'] : err.message;
            errorResponseMsg(res, 200, errorMessage);
        }).catch((err) => {
            const errorMessage = err.errors ? err.errors : err.message;
            errorResponseMsg(res, 200, errorMessage);
        });
        
    }, (err) => {
        errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        errorResponseMsg(res, 400, err.message);
    });
}

async function remove(req, res) {
    subCategoryRepository.removeSubCategory(req.params.id).then((data) => {
        if (data) {
            successResponseMsg(res, subCategoryResponseMessages.subCategoryDeleted);
        } else {
            errorResponseMsg(res, 200, subCategoryResponseMessages.subCategoryDeleteFailed);
        }
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

async function getSubCategories(req, res) {
    const params = req.params;
    subCategoryRepository.getSubCategories(params['page'], params['page_size']).then((data) => {
        successResponseMsg(res, null, data);
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

async function getCategorySubCategories(req, res) {
    const params = req.params;
    subCategoryRepository.getCategorySubCategories(params['category_id'], params['page'], params['page_size']).then((data) => {
        successResponseMsg(res, null, data);
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

module.exports.create = create;
module.exports.remove = remove;
module.exports.getSubCategories = getSubCategories;
module.exports.getCategorySubCategories = getCategorySubCategories;