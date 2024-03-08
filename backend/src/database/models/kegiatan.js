'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kegiatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kegiatan.belongsTo(models.Proyek, {
        foreignKey: 'proyekId',
        as: 'proyek',
      });

      Kegiatan.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Kegiatan.init(
    {
      proyekId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      judul: DataTypes.STRING,
      tgl_mulai: DataTypes.DATEONLY,
      tgl_selesai: DataTypes.DATEONLY,
      waktu_mulai: DataTypes.TIME,
      waktu_selesai: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: 'Kegiatan',
    }
  );
  return Kegiatan;
};
