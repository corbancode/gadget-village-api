const bcrypt = require('bcrypt');

async function hash(value) {
    const salt = await bcrypt.genSalt(20);
    const hashed = await bcrypt.hash(value, salt);
    return hashed;
}

module.exports.hash = hash;