const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
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
    // Create new user route
    .post(UserController.createUser);


router.route('/users/:userId')
    .get([authentication],UserController.getUser)
    .put([authentication], UserController.updateUser)
    .delete([authentication, authorization.admin],UserController.deleteUser);


module.exports = router;
