"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.INTEGER,
      role: DataTypes.STRING,
      civilId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phonenumber: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
