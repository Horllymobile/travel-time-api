const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const User = require('./../models/User');

module.exports = async function(req, res, next){
    const authToken = req.header('X-Auth-Token');

    if(!authToken) return res.status(403).json({error: 'Access denied. No token provided'});
    try {
        const decode = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        // console.log(decode);
        const user = await User.findOne({
           where:sequelize.where(sequelize.literal('userId'), '==', decode.userId)
        });

        if(!user) {
         return res.status(401).json({message:'Invalid user token'});
        }
        req.user = decode;
        return next();
        
    } catch (error) {
        return res.status(401).json({error: "Invalid token"});
    }
};
