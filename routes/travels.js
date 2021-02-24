const express = require('express');
const Travel = require('../models/Travel');
const routes = express.Router();


routes.get('/travels', (req, res) => {
    const travels = Travel.findAll();
    travels.then(result => {
        if(result.length > 0){
            return res.status(200).json(result);
        }
        return res.status(404).json({'message': 'No travel data yet'});
    })
    .catch(err => {
        return res.status(404).json({'error_message': err.message});
    });
});

module.exports = routes;
