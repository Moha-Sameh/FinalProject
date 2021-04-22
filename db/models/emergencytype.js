"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmergencyType extends Model {}
  EmergencyType.init(
    {
      type: DataTypes.STRING,
      risk: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EmergencyType",
    }
  );
  return EmergencyType;
};
