// this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Entry = require('./models/Entry');
const Mood = require('./models/Mood');
const Activity = require('./models/Activity');

// associations could go here!

Entry.belongsTo(User);
User.hasMany(Entry);
Mood.belongsTo(User);
User.hasMany(Mood);
Activity.belongsTo(User);
User.hasMany(Activity);

module.exports = {
  db,
  models: {
    User,
    Entry,
    Mood,
    Activity,
  },
};
