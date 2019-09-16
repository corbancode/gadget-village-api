const bcrypt = require('bcrypt');

async function hash(value) {
    const salt = await bcrypt.genSalt(20);
    const hashed = await bcrypt.hash(value, salt);
    return hashed;
}

async function compare(password, hashedPassword) {
    const result = await bcrypt.compare(password, hashedPassword);
    console.log(result);
    return result;
}

module.exports.hash = hash;
module.exports.compare = compare;