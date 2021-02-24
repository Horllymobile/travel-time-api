const User = require('../models/User');
const sequelize = require('sequelize');
const jwt = require('./../helpers/jwt');

class AuthController {
    constructor(){}

    static async login(req, res) {

        try {

            const user = await User.findOne({
                where: sequelize.where(sequelize.literal('username'), '==', req.body.username)
            });
    
            if(!user) return res.status(403).json({message: 'Invalid email address'});


            if(user.password !== req.body.password) return res.status(200).json({error: "Incorrect password"});

            const token = jwt(user)

            return res.setHeader('X-Auth-Token', token).status(200).json(token);
            
        } catch (error) {
            return res.status(500).json(error);
        }
        
    }
}


module.exports = AuthController;