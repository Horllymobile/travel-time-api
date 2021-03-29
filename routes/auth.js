/* Authentication routes 
* By Abraham James Olamide (aka) horllymobile
* @horllymobile
*/
const express = require('express');
const routes = express.Router();
const AuthController = require('./../controllers/auth.cont');
const authentication = require('../middlewares/authentication');


routes.post('/auth/login',AuthController.login);
routes.post('/auth/register',AuthController.createUser);
routes.delete('/auth/logout',AuthController.logout);
routes.post('/auth/token',AuthController.token);
routes.put('/auth/approve', (req,res) => {
    console.log(req.query);

    return res.send('Approved');
})
routes.get('/auth/user',[authentication],AuthController.getUser);


module.exports = routes;
