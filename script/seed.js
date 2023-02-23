/* eslint-disable no-console */
const {
  db, models: {
    User, Entry, Mood, Activity,
  },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const [gary, mysia] = await Promise.all([
    User.create({
      username: 'gary', password: '123', firstName: 'Gary', lastName: 'White',
    }),
    User.create({
      username: 'mysia', password: '123', firstName: 'Mysia', lastName: 'Anderson',
    }),
  ]);

  const [great, good, meh, bad, sad, anxious, irritated, awful] = await Promise.all([
    Mood.create({ name: 'Great', userId: null }),
    Mood.create({ name: 'Good', userId: null }),
    Mood.create({ name: 'Meh', userId: null }),
    Mood.create({ name: 'Bad', userId: null }),
    Mood.create({ name: 'Sad', userId: null }),
    Mood.create({ name: 'Anxious', userId: null }),
    Mood.create({ name: 'Irritated', userId: null }),
    Mood.create({ name: 'Awful', userId: null }),
  ]);

  const [work, relax, family, friends, date, sport, party, movies, gaming] = await Promise.all([
    Activity.create({ name: 'Work', userId: null }),
    Activity.create({ name: 'Relax', userId: null }),
    Activity.create({ name: 'Family', userId: null }),
    Activity.create({ name: 'Friends', userId: null }),
    Activity.create({ name: 'Date', userId: null }),
    Activity.create({ name: 'Sport', userId: null }),
    Activity.create({ name: 'Party', userId: null }),
    Activity.create({ name: 'Movies', userId: null }),
    Activity.create({ name: 'Gaming', userId: null }),
  ]);

  const [entryOne, entryTwo] = await Promise.all([
    Entry.create({
      note: 'Today was a rough day.', mood: meh.name, activities: [work.name, family.name], userId: gary.id,
    }),
    Entry.create({
      note: 'Today was a great day!', mood: great.name, activities: [work.name, date.name, friends.name], userId: gary.id,
    }),
  ]);

  console.log('seeded successfully');

  return {
    users: {
      gary,
      mysia,
    },
    moods: {
      great,
      good,
      meh,
      bad,
      sad,
      anxious,
      irritated,
      awful,
    },
    activities: {
      work,
      relax,
      family,
      friends,
      date,
      sport,
      party,
      movies,
      gaming,
    },
    entries: {
      entryOne,
      entryTwo,
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
