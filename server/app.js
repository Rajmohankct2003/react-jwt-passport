require('dotenv').config();
const passport = require('passport');
const crypto = require('crypto');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
require('./config/database');

require('./config/passport')(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
app.use('/', index);
app.use('/api/', authRoutes);
module.exports = app;
