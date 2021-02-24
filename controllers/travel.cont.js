// Getting user model from models
const User = require('../models/User');
const Travel = require('../models/Travel');
const sequelize = require('sequelize');

const uniqid = require('uniqid');

 class TravelController {

    constructor(){}

    static async getTravels(req, res) {

        try {
            const travel = await Travel.findAll();
    
            return res.status(200).json(travel);
        } catch (error) {
            return res.status(500).json({'message': error.message});
        } 
        
    }

    static async getTravel(req, res) {
        try {
            
            const travel = await Travel.findOne({
                where: sequelize.where(sequelize.literal('travel_id'), '==', req.params.travel_id)
            });
            if(!travel) return res.status(404).json({"message": `Travel with this Travel of ${req.params.travel_id} is not found`});

            return res.status(302).send(travel);

        } catch (error) {
            return res.status(500).json({'error_message': error.message});
        }
    }

    static async addTravel(req, res) {
        try {
            

            const travel = await Travel.create({
                travel_id: uniqid('travel', 'user'),
                location: req.body.location,
                purpose: req.body.purpose,
                image_url: req.body.image_url,
                description: req.body.description,
                year: req.body.year,
                userId: req.user.id
            });

            return res.status(201).json(travel);

        } catch (error) {
            return res.status(500).json({error_message: error.errors[0].message});
        }
    }

    static async updateTravel(req, res) {
        try {

            const travel = await Travel.update(req.body,{
                where: sequelize.where(sequelize.literal('travel_id'), '==', req.params.travel_id)
            });

            return res.status(201).json({"message": "Data is been updated"});

        } catch (error) {
            return res.status(500).json({'error_message': "Something went wrong unable to complete operation"});
        }
    }

    static async deleteTravel(req, res) {
        try {
            
            const travel = await Travel.findOne({
                where: sequelize.where(sequelize.literal('travel_id'), '==', req.params.travel_id)
            });

            if(travel.destroy()) return res.status(200).send(travel);

        } catch (error) {
            return res.status(404)
            .json({'error_message': `User is not found`});
        }
    }
}

module.exports = TravelController;
