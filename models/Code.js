const {Model, DataTypes} = require('sequelize');
const dbCon = require('../database/sqlite');
const bcrypt = require('bcrypt');
const Travel = require('./Travel');
class Code  extends Model {}

Code.init({
    
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_register: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
    },
}, {
    sequelize: dbCon, 
    modelName: 'code', 
    hooks:{
        afterValidate: (user)=>{
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10, 'a'));
        }
    }, 
    timestamps: true

});

User.hasMany(Travel,{
    foreignKey:'userId'
});

Travel.belongsTo(User, {foreignKey: 'userId'});

module.exports = User;


