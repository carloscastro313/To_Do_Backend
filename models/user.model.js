const { DataTypes } = require('sequelize');
const { db } = require('../database/config');


const Users = db.define('users', {
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },

}, {
    timestamps: false
});

module.exports = {
    Users
}