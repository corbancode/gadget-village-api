const userModel = require('../../db/models/user-model');

async function createUser(params) {
    const user = new userModel.User(params);

    return await user.save();
}

async function getUser(id) {
    const user = userModel.User
                .findById(id);
    return await user;
}

module.exports.createUser = createUser;
module.exports.getUser = getUser;