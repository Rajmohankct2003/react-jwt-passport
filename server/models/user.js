import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  email: String,
  firstName: String,
  password: String,
  providerId: String,
  provider: String,
});

const UserModel = model('User', UserSchema);

export { UserModel };

// 147644329026-5esrsmbji0sfkoop61ochhc8rbk77iqu.apps.googleusercontent.com
// VLeWOBuVeZPTwmeN9y2rYyDw
