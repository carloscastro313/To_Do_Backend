const { Sequelize } = require('sequelize');


const db = new Sequelize('todo_app', process.env.DbUser, process.env.DbKey, {
    host: process.env.DbHost,
    dialect: 'mysql',
    // logging: false,
});

module.exports = {
    db
}