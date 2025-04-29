const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

router.get('/register', (req, res) => res.render('auth/register'));

router.post('/register', async (req, res) => {
  try {
    const user = new User({ username: req.body.username, name: req.body.name });
    await User.register(user, req.body.password);
    res.redirect('/login');
  } catch (e) {
    res.send('Error: ' + e.message);
  }
});

router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/posts',
  failureRedirect: '/login'
}));

router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

module.exports = router;