const mongoose = require('mongoose');

require('dotenv').config();

const devConnection = process.env.MONGODB_URI;

mongoose.connect(devConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  console.log('Database connected');
});
