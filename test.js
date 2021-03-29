const crypto = require('crypto');
require('dotenv').config();

function hash(password) {

    const token = crypto.createHash('sh256');

    const final = token.update(password);

    return final.digest('hex');
    
}

console.log(hash('horllymobile'));
