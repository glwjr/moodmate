const Sequelize = require('sequelize')
const db = require('../db')

const Mood = db.define('mood', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  mood: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Mood;
