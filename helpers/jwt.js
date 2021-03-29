const jwt = require('jsonwebtoken');

module.exports = {

    generateToken(user){
        const token = jwt.sign(
        {
            userId: user.userId,
            role: user.role
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '10m',
        })  
        return token;   
    },
    generateRefreshToken(user){

        const token = jwt.sign(
            {
                userId: user.userId,
                role: user.role
            },
            process.env.REFRESH_TOKEN)
        return token; 

    }
}