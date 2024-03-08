const bcrypt = require('bcryptjs');
const Joi = require('joi');

const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('#errors/bad-request.js');
const database = require('#database');
const { generateToken, isTokenValid } = require('#utils');

const register = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      fullName: Joi.string().required(),
      rate: Joi.number().required(),
    });

    const validate = await schema.validateAsync(req.body);

    const user = await database.User.create({
      ...validate,
      password: bcrypt.hashSync(validate.password, 10),
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

const login = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const validate = await schema.validateAsync(req.body);

    const user = await database.User.findOne({
      where: {
        email: validate.email,
      },
    });

    if (!user) throw new BadRequestError('Email tidak ditemukan');

    const isPasswordValid = bcrypt.compareSync(
      validate.password,
      user.password
    );

    if (!isPasswordValid) throw new BadRequestError('Password salah');

    delete user.dataValues.password;

    const token = generateToken(user);

    res.status(StatusCodes.OK).json({
      data: {
        token,
        user,
      },
      msg: 'Login success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
