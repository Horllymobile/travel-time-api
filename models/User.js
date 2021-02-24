const {Sequelize, Model, DataTypes, DATE} = require('sequelize');
const dbCon = require('../database/sqlite');

class User  extends Model {}

User.init({
    userId:{
        type: DataTypes.STRING,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull:false,
        unique:true
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.INTEGER({length: 14}),
    },
    date_register: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now()
    },
    role: {
        type: DataTypes.ENUM(['OWNER', 'ADMIN']),
        defaultValue: false,
        allowNull: 'OWNER'
    }
}, {sequelize: dbCon, modelName: 'user', hooks:{}, timestamps: false});

module.exports = User;


