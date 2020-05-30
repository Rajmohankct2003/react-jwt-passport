const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const User = require('../models/user');

const { issueJWT } = require('./utils');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
      User.findOne({ _id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      },
      async (accessToken, refreshToken, profile, done) => {
        const { imageUrl, id, ...rest } = profile;

        let tokenObject = null;
        let error = null;
        try {
          let existingUser = await User.findOne({ providerId: id });

          if (existingUser) {
            tokenObject = issueJWT(existingUser);
          } else {
            const verifiedEmail =
              profile.emails.find((email) => email.verified) ||
              profile.emails[0];
            const newUser = new User({
              email: verifiedEmail.value,
              hash: null,
              name: profile.name.givenName,
              providerId: id,
              provider: 'Google',
              imageUrl,
            });
            let savedUser = await newUser.save();

            tokenObject = issueJWT(savedUser);
          }
        } catch (err) {
          error = err;
        }
        return done(error, tokenObject);
      }
    )
  );
};
