const { DataTypes } = require('sequelize');
const { db } = require('../database/config');
const { Users } = require('./user.model');

const Folders = db.define('Folders', {
    FolderName: {
        type: DataTypes.STRING
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'ID'
        }
    },
}, {
    timestamps: false
});

Folders.belongsTo(Users, {
    foreignKey: 'UserId'
});

module.exports = {
    Folders
}