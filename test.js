const crypto = require('crypto');

function hash(password) {
    const hash = crypto.createHmac('sha512', process.env.PASSWORD_KEY, {encoding: 'utf8'})
    const update = hash.update(password)

    return update.digest('hex');
}

// console.log(process.env.PASSWORD_KEY);
console.log(Date.now() * Math.floor(Math.random() * 5) / 2);