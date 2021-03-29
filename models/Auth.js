const {Sequelize, Model, DataTypes} = require('sequelize');
const dbCon = require('../database/sqlite');
const User = require('./User');
class RefreshToken  extends Model {}

RefreshToken.init(
    {
        refresh_token: {
            type: DataTypes.STRING({length:512}),
            allowNull: false,
            unique: true
        },
    },
    {sequelize: dbCon, modelName: 'refreshToken', hooks:{}, timestamps: false});

module.exports = RefreshToken;


