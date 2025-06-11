require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const { sequelize } = require('./databases/models');
const { restoreSession } = require('./middlewares/authMiddleware');

const app = express();
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAge: 10 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: false, // Set to true in production
  },
}));
app.use(flash());
app.use((req, res, next) => {
  if (req.cookies.flashSuccess) {
    req.flash('success', req.cookies.flashSuccess);
    res.clearCookie('flashSuccess');
  }

  if (req.cookies.flashError) {
    req.flash('error', req.cookies.flashError);
    res.clearCookie('flashError');
  }
  res.locals.session = req.session;
  res.locals.messages = {
    success: req.flash('success'),
    error: req.flash('error'),
  };
  next();
});


app.use(restoreSession);

sequelize.authenticate()
  .then(() => console.log('✅ Database connected...'))
  .catch(err => console.error('⚠️ Database connection error:', err));


app.use(require('./routes'));

module.exports = app;