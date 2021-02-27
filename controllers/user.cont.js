// Getting user model from models
const User = require('../models/User');
const sequelize = require('sequelize');
const _ = require('lodash');
const uniqid = require('uniqid');
const validateUser = require('./../validators/user.create');
const Travel = require('../models/Travel');
 class UserController {

    constructor(){}

    static async getUsers(req, res) {

        try {
            const users = await User.findAll();
    
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({'message': error.message});
        } 
        
    }

    static async getUser(req, res) {
        try {
            
            let user = await User.findOne({
                where: sequelize.where(sequelize.literal('userId'), '==', req.params.userId),
                include: [Travel]
            });
            if(!user) return res.status(404).json({"message": `User with this userId of ${req.params.userId} is not found`});
            console.log(user)
            // user = _.pick(user, ['userId','firstName', 'lastName', 'username', 'email', 'phone', 'date', 'role', 'travel']);
            return res.status(302).send(user);
        } catch (error) {
            return res.status(500).json({'error_message': error.message});
        }
    }

    static async createUser(req, res) {
        let error = validateUser(req.body);
        if(error) return res.status(401).json({message: error.message});
        try {
            

            let user = await User.create({
                userId: uniqid('user', 'travel'),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                // role: req.body.role
            }, 
            ['userId', 'firstName', 'lastName', 'username', 'email', 'password', 'phoneNumber']
            );

            user = _.pick(user, ['userId','firstName', 'lastName', 'username', 'email', 'phone', 'date']);
            return res.status(201).json(user);

        } catch (err) {
            return res.status(400).json({error_message: err.errors[0].message});
        }
    }

    static async updateUser(req, res) {
        try {

            const user = await User.update(req.body,{
                where: sequelize.where(sequelize.literal('userId'), '==', req.params.userId)
            });

            return res.status(201).json({"message": "Data is been updated"});

        } catch (error) {
            return res.status(400).json({'error_message': error});
        }
    }

    static async deleteUser(req, res) {
        try {
            
            const user = await User.findOne({
                where: sequelize.where(sequelize.literal('userId'), '==', req.params.userId)
            });

            if(user.destroy()) return res.status(200).send(user);

        } catch (error) {
            return res.status(400)
            .json({'error_message': `User is not found`});
        }
    }
}

module.exports = UserController;
