const {Sequelize} = require('sequelize');

const connection = new Sequelize('sqlite://travel_time', {
    // logging: false
});
module.exports = connection;
