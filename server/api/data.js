const router = require('express').Router();
const { models: { User, Mood } } = require('../db');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const moods = await Mood.findAll();
    const moodArray = moods.map((mood) => mood.name);
    const data = await Promise.all(moodArray.map(async (mood) => ({
      mood,
      count: await user.getMoodCount(mood),
    })));
    res.send(data);
  } catch (err) {
    next(err);
  }
});
