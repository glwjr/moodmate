const Sequelize = require('sequelize');
const db = require('../db');

const Entry = db.define('entry', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  note: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  mood: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  activities: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Entry;
