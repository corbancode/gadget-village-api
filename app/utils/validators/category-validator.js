const Joi = require('joi');

const validateCreateCategory = (body) => {
    const categorySchema = Joi.object().keys({
        name: Joi.string().min(3).max(256).required(),
    });
    
    return new Promise((resolve, reject) => {
        Joi.validate(body, categorySchema, (err, value) => { 
            if (err) {
                reject(new Error(err.details[0]['message']));
            } else {
                resolve(true);
            }
        });  // err === null -> valid
    });
    
}

const validateCreateSubCategory = (body) => {
    const subCategorySchema = Joi.object().keys({
        name: Joi.string().min(3).max(256).required(),
        category: Joi.string().required(),
    });
    
    return new Promise((resolve, reject) => {
        Joi.validate(body, subCategorySchema, (err, value) => { 
            if (err) {
                reject(new Error(err.details[0]['message']));
            } else {
                resolve(true);
            }
        });  // err === null -> valid
    });
    
}

module.exports.validateCreateCategory = validateCreateCategory;
module.exports.validateCreateSubCategory = validateCreateSubCategory;