const Sequelize = require('sequelize');
// const Brand = require('./models/Brand');
// const Vehicle = require('./models/Vehicle');

const db = new Sequelize('verceldb', "default", "dVZTUCE45vwu", {
  host: "ep-wandering-cloud-702176-pooler.us-east-1.postgres.vercel-storage.com",
  dialect: 'postgres',
  dialectModule: require('pg'),
  dialectOptions: {
    ssl: true
  }
});


module.exports = db;