const crypto = require('crypto')

const genCartId = () => crypto.randomBytes(16).toString('hex');


module.exports = genCartId;