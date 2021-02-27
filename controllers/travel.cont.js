// Getting user model from models
const User = require('../models/User');
const Travel = require('../models/Travel');
const sequelize = require('sequelize');

const uniqid = require('uniqid');

// This a class for travel controllers with static functions of controllers
 class TravelController {

    constructor(){}

    // a static function that get all travel from the database
    static async getTravels(req, res) {
        try {
            if(req.user.role === 'ADMIN'){ // get all the travels if the requestor is an admin
                const travels = await Travel.findAll({ // a sequelize funtion that find all users-travels
                    include: [User]// including the user of the travel along 
                });
                return res.status(200).json(travels);
            }
            else {
                const travels = await Travel.findAll({// if the request is not admin it should only find it own travels
                    where: sequelize.where(sequelize.literal('userId'), '==', req.user.userId) // filtering the data with where condition on the userId
                });
                return res.status(200).json(travels);
            }
        } catch (error) {
            return res.status(500).json({'message': error.message});// returning error if something went wrong
        } 
        
    }

    // getting one travel based on the travel-id parameter
    static async getTravel(req, res) {
        try {

            console.log(req.user);

            if(req.user.role === 'ADMIN'){ // getting the travel with the owner
                const travel = await Travel.findOne(
                    {
                        where: sequelize.where(sequelize.literal('travel_id'), '==', req.params.travel_id),
                        include: [User]
                    }
                );
                if(!travel) return res.status(404).json({"message": `Travel with this Travel of ${req.params.travel_id} is not found`});

                return res.status(302).send(travel);
            }
            
            const travel = await Travel.findOne(
                {
                    where: sequelize.where(sequelize.literal('travel_id'), '==', req.params.travel_id)
                }
            );
            if(!travel) return res.status(404).json({"message": `Travel with this Travel of ${req.params.travel_id} is not found`});

            return res.status(302).send(travel);

        } catch (error) {
            return res.status(500).json({'error_message': error.message});
        }
    }

    static async addTravel(req, res) {
        try {
            const travel = Travel.create(
                {
                    travel_id: uniqid('travel', 'user'),
                    location: req.body.location,
                    purpose: req.body.purpose,
                    image_url: req.body.image_url,
                    description: req.body.description,
                    year: req.body.year,
                    userId: req.user.userId
                },{include: [{model:User, required: true}]});
            if(travel) return res.status(201).json(travel);
        } catch (error) {
            return res.status(400).json(error);
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
