'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          unique: function (value, next) {
            const self = this;
            User.findOne({ where: { email: value } })
              .then(function (user) {
                if (user && self.id !== user.id) {
                  return next('Email telah digunakan!');
                }
                return next();
              })
              .catch(function (err) {
                return next(err);
              });
          },
        },
      },
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      rate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
