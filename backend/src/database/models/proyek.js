'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proyek extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Proyek.hasMany(models.Kegiatan, {
        foreignKey: 'proyekId',
        as: 'kegiatan',
      });
      Proyek.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      // define association here
    }
  }
  Proyek.init(
    {
      userId: DataTypes.INTEGER,
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Proyek',
    }
  );
  return Proyek;
};
