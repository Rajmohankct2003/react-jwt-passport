const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const issueJWT = (user) => {
  const _id = user._id;
  const expiresIn = '1d';
  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
};

const hashPassword = async (password) => {
  if (!password) {
    throw new Error('Password was not provided');
  }

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (candidate, actual) => {
  return await bcrypt.compare(candidate, actual);
};
module.exports = { issueJWT, hashPassword, verifyPassword };
