const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  hash: String,
  firstName: String,
  providerId: String,
  provider: String,
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
