const { UnauthenticatedError, UnauthorizedError } = require('..');
const { isTokenValid } = require('#utils');
const database = require('#database');

const authenticateUser = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.replace('Bearer ', '');
    }

    if (!token)
      throw new UnauthenticatedError('Authentication invalid: Token not found');

    const payload = isTokenValid({ token });

    const user = await database.User.findOne({
      where: { id: payload.id },
    });

    if (!user) throw new UnauthenticatedError('Authentication: User not found');
    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticateUser,
};
