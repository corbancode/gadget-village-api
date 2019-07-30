const merchantAdminModel = require('../../db/models/merchant-admin-model');

async function createMerchantAdmin(params) {
    const merchantAdmin = new merchantAdminModel.MerchantAdmin(params);

    return await merchantAdmin.save();
}

async function getMerchantAdmin(id) {
    const merchantAdmin = merchantAdminModel.MerchantAdmin
                                .findById(id);
    return await merchantAdmin;
}

module.exports.createMerchantAdmin = createMerchantAdmin;
module.exports.getMerchantAdmin = getMerchantAdmin;