//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Entry = require('./models/Entry');
const Mood = require('./models/Mood');

//associations could go here!

Entry.belongsTo(User);
User.hasMany(Entry);
Mood.belongsTo(User);
User.hasMany(Mood);

module.exports = {
  db,
  models: {
    User,
    Entry,
    Mood,
  },
}
