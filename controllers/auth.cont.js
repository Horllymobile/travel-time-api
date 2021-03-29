/* Authentication controller 
* By Abraham James Olamide (aka) horllymobile
* @horllymobile
*/
const User = require('../models/User');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const jwtFunction = require('./../helpers/jwt');
const bcrypt = require('bcrypt');
const Auth = require('./../models/Auth');
const _ = require('lodash');
const Travel = require('./../models/Travel');
const validateUser = require('./../validators/user.create');
const uniqId = require('uniqid');
class AuthController {
    constructor(){}

    static async createUser(req, res) {
        //let error = validateUser(req.body);
        // if(error) return res.status(401).json({message: error.message});
        // console.log(req.body);
        try {
            
            let user = await User.create({
                userId: uniqId('user', 'travel'),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                role: req.body.role,
                approved: req.body.approved
            }, 
            ['userId', 'firstName', 'lastName', 'username', 'email', 'password', 'phoneNumber']
            );

            user = _.pick(user, ['userId','firstName', 'lastName', 'username', 'email', 'phone', 'date']);
            return res.status(201).json(user);

        } catch (err) {
            return res.status(400).json({error: err.errors[0].message});
        }
    }

    // authentication login router middleware
    static async login(req, res) {
        try {
            // finding username with the username from the request body
            let user = await User.findOne({
                where: sequelize.where(sequelize.literal('username'), '==', req.body.username) // where condition logic
            });
    
            if(!user) return res.status(400).json({message: 'Invalid username'}); // error message if user does not exits 

            const compare = await bcrypt.compare(req.body.password, user.password); // checking if the password produce match the hashed password
            if(!compare) return res.status(400).json({message: "Incorrect password"});// if the password does not match incorrect password message

            const token = jwtFunction.generateToken(user); // generating accessToken
            const refreshToken = jwtFunction.generateRefreshToken(user); // generating refreshToken
            req.refreshToken = refreshToken; // saving the refreshToken to the request
            const saved = await Auth.create({
                refresh_token:refreshToken // saving refreshToken to the database
            });
            console.log(token, refreshToken);
            user = _.pick(user, ['userId','firstName', 'lastName', 'username', 'email', 'phone', 'date', 'travels']);
            // if refreshToken saving is successful this will be returned
            if(saved) return res
            .status(200).json({
                accessToken: token,
                'refreshToken':refreshToken,
                user: user
            });
            
        } catch (error) {
            return res.status(500).json(error);// catching any error that occurs 
        }
        
    }

    static async getUser(req, res) {

        try {
            console.log(req.user)

            let user = await User.findOne({
                where: sequelize.where(sequelize.literal('userId'), '==', req.user.userId),
                include: [Travel]
            });
    
            if(!user) return res.status(400).json({message: 'User not found'});

            user = _.pick(user, 
                ['userId','firstName', 'lastName', 'username', 
                'email', 'phoneNumber', 'date_register', 'role', 'travels']);
            
            return res.status(200).json(user);
            
        } catch (error) {
            return res.status(500).json(error);
        }

    }

    static async logout(req, res) {

        try {
            const logout = await Auth.findOne({
                where: sequelize.where(sequelize.literal('refresh_token'), '==', req.body.refreshToken)
            });

            if(!logout) {
                return res.status(403).json({message: "Error logout fail"});
            }
            await logout.destroy();
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json(error);
        }

    }

    static async token(req, res) {
        const refreshToken = req.body.refreshToken;
        if(refreshToken === null) return res.sendStatus(401);
        try{

            const refresh_token = await Auth.findOne({
                where: sequelize.where(sequelize.literal('refresh_token'), '==', refreshToken)
            });
            if(!refresh_token) return res.sendStatus(403);


            jwt.verify(refreshToken, process.env.REFRESH_TOKEN,{} ,(err, user) => {
                if(err) return res.sendStatus(403);
                const accessToken = jwtFunction.generateToken({userId: user.userId, role: user.role});
                return res.status(200).json({accessToken});
            });

        }catch(err){
            return res.status(500).json({message: 'Error'});
        }
    }
}


module.exports = AuthController;