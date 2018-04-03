const db = require("./db.js")
const Sequelize = require('sequelize');

const Todos = db.define('todo', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type :Sequelize.INTEGER
  },
  message: Sequelize.TEXT,
  completion: Sequelize.BOOLEAN,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

module.exports = Todos;