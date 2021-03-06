"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Emergency extends Model {}
  Emergency.init(
    {
      media: DataTypes.STRING,
      location: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
      },
      lat: {
        type: DataTypes.STRING,
      },
      lng: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Emergency",
    }
  );
  return Emergency;
};
