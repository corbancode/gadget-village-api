const Joi = require('joi');

const productTypes = ['auction', 'buy now pay later', 'logistic repair'];

const validateCreateProduct = (body) => {
    const productSchema = Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        type: Joi.string().required().only(productTypes)
    });
    
    return new Promise((resolve, reject) => {
        Joi.validate(body, productSchema, (err, value) => { 
            if (err) {
                reject(new Error(err.details[0]['message']));
            } else {
                resolve();
            }
        });  // err === null -> valid
    });
    
}

const validateUpdateProduct = (body) => {
    const productSchema = Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        type: Joi.string().required().only(productTypes)
    });
    
    return new Promise((resolve, reject) => {
        Joi.validate(body, productSchema, (err, value) => { 
            if (err) {
                reject(new Error(err.details[0]['message']));
            } else {
                resolve();
            }
        });  // err === null -> valid
    });
    
}

module.exports.validateCreateProduct = validateCreateProduct;
module.exports.validateUpdateProduct = validateUpdateProduct;