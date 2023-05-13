const Sequelize = require('sequelize');
// const Brand = require('./models/Brand');
// const Vehicle = require('./models/Vehicle');

module.exports = async (req, res) => {
  const db = new Sequelize('intents', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  });
  return 'Ready!';
}


