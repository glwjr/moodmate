const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (err) {
    next(err)
  }
});

router.post("/user", async (req, res) => {
  try {
    const token = await User.encryptUser(req.body);
    res.json(token);
  } catch (err) {
    res.status(500).json({
      message: "Could not register user",
      error: err.message,
    });
  }
});

router.put('/user', async(req, res) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "Could not update user",
      error: err.message,
    });
  }
});
