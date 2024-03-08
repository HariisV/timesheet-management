const bcrypt = require('bcryptjs');
const Joi = require('joi');

const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('#errors/bad-request.js');
const database = require('#database');
const { generateToken, isTokenValid } = require('#utils');

const update = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).allow(''),
      fullName: Joi.string().required(),
      rate: Joi.number().required(),
    });

    const validate = await schema.validateAsync(req.body);

    if (validate.password) {
      validate.password = bcrypt.hashSync(validate.password, 10);
    }

    const user = await database.User.create({
      ...validate,
    });

    delete user.dataValues.password;
    res.status(StatusCodes.CREATED).json({
      data: {
        ...user.dataValues,
        token: generateToken(user),
      },
      msg: 'Berhasil mendaftar',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  update,
};
