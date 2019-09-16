const merchantAdminModel = require('../../db/models/merchant-admin-model');


async function findByEmail(email) {
    const user = await merchantAdminModel.MerchantAdmin
                                .findOne({email: email});
    return user;
}

async function findToken(_id, token) {
    const user = await merchantAdminModel.MerchantAdmin
                                .findById({_id});
    if (!user) return false;
    const userTokens = user.tokens;
    return userTokens.includes(token);
}

module.exports.findByEmail = findByEmail;
module.exports.findToken = findToken;