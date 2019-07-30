const Joi = require('joi');


const validateCreateMerchant = (body) => {
    const merchantSchema = Joi.object().keys({
        name: Joi.string().min(3).max(150).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).min(5).max(256).required(),
        password: Joi.string().min(8).max(256).required(),
        phone_number: Joi.string().regex(/^[0]+[0-9]{10}$/).min(5).max(50).required(),
        logo: Joi.string().optional(),
    });
    
    return new Promise((resolve, reject) => {
        Joi.validate(body, merchantSchema, (err, value) => { 
            if (err) {
                reject(new Error(err.details[0]['message']));
            } else {
                resolve();
            }
        });  // err === null -> valid
    });
    
}

module.exports.validateCreateMerchant = validateCreateMerchant;