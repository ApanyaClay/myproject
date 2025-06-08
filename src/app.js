require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');



const { sequelize } = require('./databases/models');

const app = express();
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


sequelize.authenticate()
  .then(() => console.log('✅ Database connected...'))
  .catch(err => console.error('⚠️ Database connection error:', err));


app.use(require('./routes'));

module.exports = app;