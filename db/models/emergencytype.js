"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmergencyType extends Model {}
  EmergencyType.init(
    {
      type: DataTypes.STRING,
      risk: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EmergencyType",
    }
  );
  return EmergencyType;
};
