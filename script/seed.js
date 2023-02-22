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
    Mood.create({ name: 'Great', userId: gary.id }),
    Mood.create({ name: 'Good', userId: gary.id }),
    Mood.create({ name: 'Meh', userId: gary.id }),
    Mood.create({ name: 'Bad', userId: gary.id }),
    Mood.create({ name: 'Sad', userId: gary.id }),
    Mood.create({ name: 'Anxious', userId: gary.id }),
    Mood.create({ name: 'Irritated', userId: gary.id }),
    Mood.create({ name: 'Awful', userId: gary.id }),
  ]);

  const [work, relax, family, friends, date] = await Promise.all([
    Activity.create({ name: 'Work', userId: gary.id }),
    Activity.create({ name: 'Relax', userId: gary.id }),
    Activity.create({ name: 'Family', userId: gary.id }),
    Activity.create({ name: 'Friends', userId: gary.id }),
    Activity.create({ name: 'Date', userId: gary.id }),
  ]);

  const [entryOne, entryTwo] = await Promise.all([
    Entry.create({
      text: 'Today was a rough day.', mood: meh.name, activities: [work.name, family.name], userId: gary.id,
    }),
    Entry.create({
      text: 'Today was a great day!', mood: great.name, activities: [work.name, date.name, friends.name], userId: gary.id,
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
