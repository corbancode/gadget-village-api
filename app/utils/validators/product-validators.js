const Joi = require('joi');


const validateCreateProduct = (body) => {
    const productSchema = Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
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