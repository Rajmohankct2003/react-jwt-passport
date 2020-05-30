const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  hash: String,
  providerId: String,
  provider: String,
  name: String,
  imageUrl: String,
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
