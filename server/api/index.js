const router = require('express').Router();

module.exports = router;

router.use('/users', require('./users'));
router.use('/entries', require('./entries'));
router.use('/moods', require('./moods'));
router.use('/activities', require('./activities'));
router.use('/data', require('./data'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
