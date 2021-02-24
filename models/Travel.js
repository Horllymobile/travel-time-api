const {Sequelize, Model, DataTypes} = require('sequelize');
const dbCon = require('../database/sqlite');
const User = require('./User');
class Travel  extends Model {}

Travel.init({
    travel_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    purpose: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    year: {
        type: DataTypes.DATEONLY,
        allowNull:false,
    },
}, {sequelize: dbCon, modelName: 'travel', hooks:{}, timestamps: false});

Travel.belongsTo(User, {as: 'userId'});

module.exports = Travel;


