
const jwt = require('jsonwebtoken');


function admin(req, res, next){
    const user = req.user;
    console.log(req.user);
    console.log(req.user.role);
    if(req.user.role !== 'ADMIN') return res.status(401).json({error: 'Access denied. Not Authorized'});

    return next();
}

// function user(req, res, next) {
    
// }


module.exports = {
    admin
};
