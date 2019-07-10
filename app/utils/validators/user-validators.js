const Joi = require('joi');


const validateCreateUser = (body) => {
    const userSchema = Joi.object().keys({
        fullname: Joi.string().alphanum().min(3).max(60).required(),
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        date_of_birth: Joi.string().date(),
        email: Joi.string().email({ minDomainAtoms: 2 })
    });
    
    return new Promise((resolve, reject) => {
        Joi.validate(body, userSchema, (err, value) => { 
            if (err) {
                reject(new Error(err.details[0]['message']));
            } else {
                resolve();
            }
        });  // err === null -> valid
    });
    
}

module.exports.validateCreateUser = validateCreateUser;