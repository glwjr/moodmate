const Sequelize = require('sequelize');
const db = require('../db');

const Activity = db.define('activity', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: true,
  },
});

module.exports = Activity;
