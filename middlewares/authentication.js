const jwt = require('jsonwebtoken');


module.exports = function(req, res, next){
    const authToken = req.header('X-Auth-Token');

    if(!authToken) return res.status(403).json({error: 'Access denied. No token provided'});

    try {
        const decode = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({error: "Invalid token"});
    }
};
