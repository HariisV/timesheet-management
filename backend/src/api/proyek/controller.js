const bcrypt = require('bcryptjs');
const Joi = require('joi');

const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('#errors/bad-request.js');
const database = require('#database');

const get = async (req, res, next) => {
  const { id } = req.user;
  try {
    const result = await database.Proyek.findAll({
      include: {
        model: database.Kegiatan,
        as: 'kegiatan',
      },
      where: {
        userId: id,
      },
    });

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const insert = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(id);
    const schema = Joi.object({
      nama: Joi.string().required(),
    });

    const validate = await schema.validateAsync(req.body);

    const checkIfExist = await database.Proyek.findOne({
      where: {
        nama: validate.nama,
        userId: id,
      },
    });

    if (checkIfExist) {
      throw new BadRequestError('Sudah ada proyek dengan nama tersebut');
    }
    const result = await database.Proyek.create({ ...validate, userId: id });

    res.status(StatusCodes.CREATED).json({
      data: result,
      msg: 'Berhasil mendaftar',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insert,
  get,
};
