require('dotenv').config();
const passport = require('passport');
const express = require('express');
const path = require('path');
const cors = require('cors');
const User = require('./models/user');
const app = express();
require('./config/database');
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};
app.use(cors(corsOption));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const authRoutes = require('./routes/authRoutes');
app.use('/api/', authRoutes);
module.exports = app;
