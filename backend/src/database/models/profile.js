'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile.init(
    {
      firstName: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      lastName: DataTypes.STRING,
      bio: DataTypes.TEXT,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Profile',
    }
  );
  return Profile;
};
