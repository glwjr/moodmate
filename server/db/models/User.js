/* eslint-disable func-names */
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  // we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

User.prototype.getEntries = async function () {
  const entries = await db.models.entry.findAll({
    where: {
      userId: this.id,
    },
  });

  return entries;
};

User.prototype.addEntry = async function (entry) {
  const newEntry = await db.models.entry.create({
    note: entry.note,
    mood: entry.mood,
    activities: entry.activities,
    userId: this.id,
  });

  return newEntry;
};

User.prototype.getMoods = async function () {
  const moods = await db.models.mood.findAll({
    where: {
      [Sequelize.Op.or]: [{ userId: this.id }, { userId: null }],
    },
  });

  return moods;
};

User.prototype.addMood = async function (mood) {
  const newMood = await db.models.mood.create({ mood });
  return newMood;
};

User.prototype.getActivities = async function () {
  const activities = await db.models.activity.findAll({
    where: {
      [Sequelize.Op.or]: [{ userId: this.id }, { userId: null }],
    },
  });

  return activities;
};

User.prototype.addActivity = async function (activity) {
  const newActivity = await db.models.activity.create({ activity });
  return newActivity;
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      // eslint-disable-next-line no-throw-literal
      throw 'nooo';
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  // in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    // eslint-disable-next-line no-param-reassign
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
