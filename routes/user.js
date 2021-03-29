/* User routes 
* By Abraham James Olamide (aka) horllymobile
* @horllymobile
*/
const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');

const UserController = require('../controllers/user.cont');
const authentication = require('../middlewares/authentication');
const authorization = require('./../middlewares/authorization');
// Getting user model from models
const User = require('../models/User');
const sequelize = require('sequelize');

// router.route('/users')

router.route('/users')
    .get([authentication, authorization.admin], UserController.getUsers)

router.route('/user')
    .get([authentication],UserController.getUser)
    .put([authentication], UserController.updateUser)
    .delete([authentication, authorization.admin],UserController.deleteUser);


module.exports = router;
