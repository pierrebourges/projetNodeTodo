const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: Op,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: './database'
});

module.exports = db;