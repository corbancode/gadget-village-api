const Joi = require('joi');
const config = require('config');

const productTypes = config.get('productTypes');
const paymentMethods = config.get('paymentMethods');

const validateCreateProduct = (body) => {
    const productSchema = Joi.object().keys({
        type: Joi.string().required().only(productTypes),
        title: Joi.string().min(3).max(256).required(),
        description: Joi.string().min(25).required(),
        price: Joi.number().min(0).required(),
        avatars: Joi.array().min(1).max(8).required(),
        payment_method: Joi.string().required().only(paymentMethods),
        bidding_increment: Joi.number(),
        bidding_start_date: Joi.date().min('now'),
        bidding_end_date: Joi.date().min(body.bidding_start_date),
        merchant: Joi.string().optional(),
        merchant_admin: Joi.string().optional(),
        category: Joi.string().optional(),
        sub_category: Joi.string().optional(),
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
        type: Joi.string().required().only(productTypes),
        description: Joi.string().min(25).required(),
        price: Joi.number().min(0).required(),
        payment_method: Joi.string().required().only(paymentMethods),
        bidding_increment: Joi.number(),
        bidding_start_date: Joi.date().min('now'),
        bidding_end_date: Joi.date().min(body.bidding_start_date),
        category: Joi.string().optional(),
        sub_category: Joi.string().optional(),
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