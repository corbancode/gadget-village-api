const Joi = require('joi');


const validateCreateMerchantAdmin = (body) => {
    const merchantAdminSchema = Joi.object().keys({
        fullname: Joi.string().min(3).max(150).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).min(5).max(256).required(),
        phone_number: Joi.string().regex(/^[0]+[0-9]{10}$/).min(5).max(50).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8),
        password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({language: {any: {allowOnly: 'must match password'}}}),
        merchant: Joi.number().required(),
        display_picture: Joi.string().optional(),
        is_super_admin: Joi.boolean().optional(),
    });
    
    return new Promise((resolve, reject) => {
        Joi.validate(body, merchantAdminSchema, (err, value) => { 
            if (err) {
                reject(new Error(err.details[0]['message']));
            } else {
                resolve();
            }
        });  // err === null -> valid
    });
    
}

module.exports.validateCreateMerchantAdmin = validateCreateMerchantAdmin;