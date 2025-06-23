const bcrypt = require('bcrypt');

async function hashPassword(password) {
    if (!password) throw new Error('Password is required');
    const randomSalt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, randomSalt);
}

async function comparePassword(password, hash) {
    if (!password || !hash) throw new Error('Password and hash are required');
    return await bcrypt.compare(password, hash);
}

module.exports = { hashPassword, comparePassword };

// Usage example:
// const { hashPassword, comparePassword } = require('./password');
// (async () => {
//   const hash = await hashPassword('yourPassword');
//   const isMatch = await comparePassword('yourPassword', hash);
//   console.log('Hash:', hash, 'Match:', isMatch);
// })();