const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
const User = require('../models/user');
const { verifyPassword, hashPassword, issueJWT } = require('../config/utils');

const GoogleStrategy = passportGoogle.OAuth2Strategy;
const strategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_API_URL}/google`,
};

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  let user = null;
  let error = null;
  try {
    user = await User.findOne({ providerId: profile.id });
  } catch (exp) {
    error = exp;
  }

  if (error || user) return done(error, user);

  const verifiedEmail =
    profile.emails.find((email) => email.verified) || profile.emails[0];

  const newUser = new User({
    email: verifiedEmail.value,
    password: null,
    firstName: profile.name.givenName,
    providerId: profile.id,
    provider: profile.provider,
  });

  let savedUser = null;
  let tokenObject = null;
  let saveError = null;
  try {
    savedUser = await newUser.save();
    console.log(savedUser);
    tokenObject = issueJWT(user);
  } catch (exp) {
    saveError = exp;
  }

  if (saveError || tokenObject) return done(saveError, tokenObject);
};

module.exports = (passport) => {
  passport.use(new GoogleStrategy(strategyOptions, verifyCallback));
};
