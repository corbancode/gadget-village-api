const _ = require('lodash');

function merchantView(data) {
    return _.pick(data, [
        '_id', 'merchant', 'fullname', 'email', 'phone_number', 'created_at', 'updated_at', 'active', 'is_super_admin'
    ]);
}

module.exports.merchantView = merchantView;
