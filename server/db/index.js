//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Entry = require('./models/Entry')

Entry.belongsTo(User);
User.hasMany(Entry);
//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Entry,
  },
}
