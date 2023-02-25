/* eslint-disable func-names */
const Sequelize = require('sequelize');
const db = require('../db');

const Mood = db.define('mood', {
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

module.exports = Mood;
