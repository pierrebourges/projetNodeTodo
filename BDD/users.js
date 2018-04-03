const db = require("./db.js")
const Sequelize = require('sequelize');

const Users = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type :Sequelize.INTEGER
  },
  pseudo: Sequelize.TEXT,
  password: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

module.exports = Users;