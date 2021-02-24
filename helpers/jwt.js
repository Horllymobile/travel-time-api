const jwt = require('jsonwebtoken');

module.exports = function (user) {

    const token = jwt.sign(
        {
            userId: user.userId,
            role: user.role
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '1h',
        }
    );
    
    return token;
}