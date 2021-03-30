const { Sequelize } = require('sequelize');


const db = new Sequelize(process.env.DbName, process.env.DbUser, process.env.DbKey, {
    host: process.env.DbHost,
    dialect: 'mysql',
    // logging: false,
});

module.exports = {
    db
}