const jwt = require('jsonwebtoken');

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const generateToken = (payload) => {
  const result = {
    id: payload.id,
  };

  delete payload.password;
  return jwt.sign(result, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = {
  isTokenValid,
  generateToken,
};
