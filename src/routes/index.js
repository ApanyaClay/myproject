const express = require('express');
const router = express.Router();
const authRoter = require('./auth');
const { restoreSession, requireLogin } = require('../middlewares/authMiddleware');

router.get('/dashboard', async (req, res, next) => {
  res.render('dashboard');
});

router.get('/register', async (req, res, next) => {
  res.render('auth/register');
});

router.get('/forgot-password', async (req, res, next) => {
  res.render('auth/forget-password');
});

router.get('/', requireLogin, async (req, res, next) => {
  try {
    res.render('index', {
      title: 'Home Page',
      message: 'Welcome to the Home Page!',
    });
  } catch (error) {
    console.error('Error checking session:', error);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/test', async (req, res, next) => {
  try {
    res.render('test', {
      title: 'Test Page',
      message: 'Welcome to the Test Page!',
    });
  } catch (error) {
    console.error('Error checking session:', error);
    return res.status(500).send('Internal Server Error');
  }
});

router.use('', authRoter);

module.exports = router;
