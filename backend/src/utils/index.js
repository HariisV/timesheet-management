const jwt = require('./jwt');

module.exports = {
  generateToken: jwt.generateToken,
  isTokenValid: jwt.isTokenValid,
};
