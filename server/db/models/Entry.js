const Sequelize = require('sequelize');
const db = require('../db');

const Entry = db.define('entry', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  mood: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});

module.exports = Entry;
