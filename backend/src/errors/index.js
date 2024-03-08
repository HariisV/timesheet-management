const NotFoundError = require('./not-found');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
};
