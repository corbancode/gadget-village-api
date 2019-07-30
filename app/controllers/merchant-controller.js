const {validateCreateMerchant} = require('../utils/validators/merchant-validator');
const {successResponseMsg, errorResponseMsg} = require('../utils/response');
const {merchantResponseMessages} = require('../utils/response-messages');
const merchantRepository = require('../repositories/merchant-repository');
const {createMerchantAdmin} = require('../repositories/merchant-admin-repository');
const {merchantView} = require('../utils/view');
const {hash} = require('../utils/hash');

async function create(req, res) {
    validateCreateMerchant(req.body).then((succ) => {
        const merchant = req.body;
        merchantRepository.merchantExists(merchant.email, merchant.phone_number).then((value)=> {
            if (value) return errorResponseMsg(res, 200, merchantResponseMessages.merchantExists);

            // merchant does not exist
            merchantRepository.createMerchant(merchant).then((data) => {
                hash(merchant['password']).then((hashedPassword) => {
                    // create super admin for merchant
                    const merchantAdmin = {
                        merchant: data['_id'],
                        fullname: data['name'],
                        email: data['email'],
                        phone_number: data['phone_number'],
                        // get password from request body
                        password: hashedPassword,
                        display_picture: data['logo'],
                        is_super_admin: true
                    };
                    createMerchantAdmin(merchantAdmin).then((admin) => {
                        admin.merchant = data;
                        successResponseMsg(res, merchantResponseMessages.merchantCreated, merchantView(admin));
                    }, (err) => {
                        merchantRepository.deleteMerchant(data['_id']);
                        const errorMessage = err.errors ? err.errors[Object.keys(err.errors)[0]]['message'] : err.message;
                        errorResponseMsg(res, 200, errorMessage);
                    }).catch((err) => {
                        merchantRepository.deleteMerchant(data['_id']);
                        const errorMessage = err.errors ? err.errors : err.message;
                        errorResponseMsg(res, 200, errorMessage);
                    });
                });
                
            }, (err) => {
                const errorMessage = err.errors ? err.errors[Object.keys(err.errors)[0]]['message'] : err.message;
                errorResponseMsg(res, 200, errorMessage);
            }).catch((err) => {
                const errorMessage = err.errors ? err.errors : err.message;
                errorResponseMsg(res, 200, errorMessage);
            });
        
        }, (err) => {
            const errorMessage = err.errors ? err.errors : err.message;
            errorResponseMsg(res, 200, errorMessage);
        });
        
    }, (err) => {
        errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        errorResponseMsg(res, 400, err.message);
    });
}

async function getMerchant(req, res) {
    const params = req.params;
    merchantRepository.getMerchant(params['id']).then((data) => {
        successResponseMsg(res, null, data);
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

module.exports.create = create;
module.exports.getMerchant = getMerchant;