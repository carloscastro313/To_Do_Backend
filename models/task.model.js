const { DataTypes } = require('sequelize');
const { db } = require('../database/config');
const { Folders } = require('./folder.model');

const Tasks = db.define('tasks', {
    Instruction: {
        type: DataTypes.STRING
    },
    IsDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    FolderId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Folders',
            key: 'ID'
        }
    },
}, {
    timestamps: false
});

Tasks.belongsTo(Folders);

module.exports = {
    Tasks
}