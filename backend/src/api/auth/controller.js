const bcrypt = require('bcryptjs');
const Joi = require('joi');

const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('#errors/bad-request.js');
const database = require('#database');
const { generateToken, isTokenValid } = require('#utils');

const register = async (req, res, next) => {
  const t = await database.sequelize.transaction();

  try {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      bio: Joi.string(),
      avatar: Joi.string().required(),
    });

    const validate = await schema.validateAsync({
      ...req.body,
      avatar: req.file?.path,
    });

    const user = await database.User.create(
      {
        ...validate,
        password: bcrypt.hashSync(validate.password, 10),
      },
      { transaction: t }
    );

    const profile = await database.Profile.create(
      {
        ...validate,
        userId: user.id,
      },
      { transaction: t }
    );

    await t.commit();

    res.status(StatusCodes.CREATED).json({
      data: {
        ...user.dataValues,
        ...profile.dataValues,
        token: generateToken(user),
      },
      msg: 'Berhasil mendaftar',
    });
  } catch (error) {
    await t.rollback();
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
