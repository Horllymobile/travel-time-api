const express = require('express');
const Travel = require('../models/Travel');
const TravelController = require('./../controllers/travel.cont');
const routes = express.Router();
const authentication = require('./../middlewares/authentication');
routes.route('/travels')
    .get([authentication], TravelController.getTravels)
    .post([authentication],TravelController.addTravel);

routes.route('/travels/:travel_id')
    .get([authentication],TravelController.getTravel)
    .put([authentication],TravelController.updateTravel)
    .delete([authentication], TravelController.deleteTravel);

module.exports = routes;
