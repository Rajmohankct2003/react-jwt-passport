require('dotenv').config();
const passport = require('passport');
const crypto = require('crypto');
const express = require('express');
const path = require('path');
const cors = require('cors');
const User = require('./models/user');
const app = express();
require('./config/database');
app.options('*', cors());
app.use(cors());

require('./config/passport')(passport);
require('./config/google')(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
app.use('/', index);
app.use('/api/', authRoutes);
module.exports = app;
