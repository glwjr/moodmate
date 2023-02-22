/* eslint-disable no-console */
const { db, models: { User, Entry, Mood } } = require('../server/db');

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

  const entries = await Promise.all([
    Entry.create({ text: 'Today was a rough day.', mood: 'Meh', userId: gary.id }),
  ]);

  const [great, good, meh, bad, sad, anxious, irritated, awful] = await Promise.all([
    Mood.create({ mood: 'Great' }),
    Mood.create({ mood: 'Good' }),
    Mood.create({ mood: 'Meh' }),
    Mood.create({ mood: 'Bad' }),
    Mood.create({ mood: 'Sad' }),
    Mood.create({ mood: 'Anxious' }),
    Mood.create({ mood: 'Irritated' }),
    Mood.create({ mood: 'Awful' }),
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
    entries,
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
