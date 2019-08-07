const {validateCreateCategory} = require('../utils/validators/category-validator');
const {successResponseMsg, errorResponseMsg} = require('../utils/response');
const {categoryResponseMessages} = require('../utils/response-messages');
const categoryRepository = require('../repositories/category-repository');

async function create(req, res) {
    validateCreateCategory(req.body).then((succ) => {
        const category = req.body;
        categoryRepository.createCategory(category).then((data) => {
            successResponseMsg(res, categoryResponseMessages.categoryCreated, data);
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
    categoryRepository.removeCategory(req.params.id).then((data) => {
        if (data) {
            successResponseMsg(res, categoryResponseMessages.categoryDeleted);
        } else {
            errorResponseMsg(res, 200, categoryResponseMessages.categoryDeleteFailed);
        }
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

async function getCategories(req, res) {
    const params = req.params;
    categoryRepository.getCategories(params['page'], params['page_size']).then((data) => {
        successResponseMsg(res, null, data);
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

module.exports.create = create;
module.exports.remove = remove;
module.exports.getCategories = getCategories;