const _ = require('lodash');

function merchantView(data) {
    return _.pick(data, [
        '_id', 'merchant', 'fullname', 'email', 'phone_number', 'created_at', 'updated_at', 'active', 'is_super_admin'
    ]);
}

function userView(data) {
    return _.pick(data, [
        '_id', 'fullname', 'username', 'date_of_birth', 'email', 'phone_number', 'display_picture', 'created_at', 'updated_at', 'active'
    ]);
}

module.exports.merchantView = merchantView;
module.exports.userView = userView;
