const merchantModel = require('../../db/models/merchant-model');

async function createMerchant(params) {
    const merchant = new merchantModel.Merchant(params);

    return await merchant.save();
}

async function getMerchant(id) {
    const merchant = merchantModel.Merchant
                                .findById(id);

    return await merchant;
}

async function merchantExists(email, phone_number) {
    const merchant = await merchantModel.Merchant
                                .findOne()
                                .or([{email: email}, {phone_number: phone_number}]);
    return merchant;
}

async function deleteMerchant(id) {
    const result = merchantModel.Merchant.findByIdAndRemove(id);
    return await result;
}

module.exports.createMerchant = createMerchant;
module.exports.getMerchant = getMerchant;
module.exports.deleteMerchant = deleteMerchant;
module.exports.merchantExists = merchantExists;