const Sequelize = require('sequelize');
// const Brand = require('./models/Brand');
// const Vehicle = require('./models/Vehicle');

const db = new Sequelize('app_taller', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
});


module.exports = db;