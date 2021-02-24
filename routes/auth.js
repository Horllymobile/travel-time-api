const express = require('express');
const routes = express.Router();
const AuthController = require('./../controllers/auth.cont');

routes.post('/auth/login',AuthController.login);

module.exports = routes;
