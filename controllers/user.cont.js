// Getting user model from models
const User = require('../models/User');
const sequelize = require('sequelize');

const uniqid = require('uniqid');

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
            
            const user = await User.findOne({
                where: sequelize.where(sequelize.literal('userId'), '==', req.params.userId)
            });
            if(!user) return res.status(404).json({"message": `User with this userId of ${req.params.userId} is not found`});

            return res.status(302).send(user);

        } catch (error) {
            return res.status(500).json({'error_message': error.message});
        }
    }

    static async createUser(req, res) {
        try {
            

            const user = await User.create({
                userId: uniqid('user', 'travel'),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                role: req.body.role
            });

            return res.status(201).json(user);

        } catch (error) {
            return res.status(500).json({error_message: error.errors[0].message});
        }
    }

    static async updateUser(req, res) {
        try {

            const user = await User.update(req.body,{
                where: sequelize.where(sequelize.literal('userId'), '==', req.params.userId)
            });

            return res.status(201).json({"message": "Data is been updated"});

        } catch (error) {
            return res.status(500).json({'error_message': "Something went wrong unable to complete operation"});
        }
    }

    static async deleteUser(req, res) {
        try {
            
            const user = await User.findOne({
                where: sequelize.where(sequelize.literal('userId'), '==', req.params.userId)
            });

            if(user.destroy()) return res.status(200).send(user);

        } catch (error) {
            return res.status(404)
            .json({'error_message': `User is not found`});
        }
    }
}

module.exports = UserController;
