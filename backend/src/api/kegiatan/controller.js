const bcrypt = require('bcryptjs');
const Joi = require('joi');

const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('#errors/bad-request.js');
const database = require('#database');

const get = async (req, res, next) => {
  try {
    const { id } = req.user;
    const result = await database.Kegiatan.findAll({
      where: {
        userId: id,
      },
      include: {
        model: database.Proyek,
        as: 'proyek',
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
    const schema = Joi.object({
      judul: Joi.string().required(),
      tgl_mulai: Joi.date().required(),
      tgl_selesai: Joi.date().required(),
      waktu_mulai: Joi.string().required(),
      waktu_selesai: Joi.string().required(),
      proyekId: Joi.number().required(),
    });

    const validate = await schema.validateAsync(req.body);

    const checkIfProyekExist = await database.Proyek.findOne({
      where: {
        id: validate.proyekId,
        userId: id,
      },
    });

    if (!checkIfProyekExist) {
      throw new BadRequestError('Proyek tidak terdaftar');
    }
    const result = await database.Kegiatan.create({ ...validate, userId: id });

    res.status(StatusCodes.CREATED).json({
      data: result,
      msg: 'Berhasil mendaftar',
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.user;

    const schema = Joi.object({
      id: Joi.number().required(),
      judul: Joi.string().required(),
      tgl_mulai: Joi.date().required(),
      tgl_selesai: Joi.date().required(),
      waktu_mulai: Joi.string().required(),
      waktu_selesai: Joi.string().required(),
      proyekId: Joi.number().required(),
    });

    const validate = await schema.validateAsync(req.body);

    const checkIfProyekExist = await database.Proyek.findOne({
      where: {
        id: validate.proyekId,
        userId: id,
      },
    });

    if (!checkIfProyekExist) {
      throw new BadRequestError('Proyek tidak terdaftar');
    }

    let kegiatan = await database.Kegiatan.findOne({
      where: {
        id: validate.id,
        userId: id,
      },
    });

    if (!kegiatan) throw new BadRequestError('Kegiatan tidak ditemukan');

    await database.Kegiatan.update(validate, {
      where: {
        id: validate.id,
        userId: id,
      },
    });

    res.status(StatusCodes.OK).json({
      msg: 'Berhasil mengubah kegiatan',
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { id: userId } = req.user;

    const kegiatan = await database.Kegiatan.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!kegiatan) throw new BadRequestError('Kegiatan tidak ditemukan');

    await database.Kegiatan.destroy({
      where: {
        id,
        userId,
      },
    });

    res.status(StatusCodes.OK).json({
      msg: 'Berhasil menghapus kegiatan',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  get,
  insert,
  update,
  remove,
};
