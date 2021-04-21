"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Association User and Emergency
//React-Native user request
db.User.hasMany(db.Emergency, {
  foreignKey: "requesterId",
  allowNull: false,
});
db.Emergency.belongsTo(db.User, {
  foreignKey: "requesterId",
  allowNull: false,
  as: "Requester",
});
//Dashboard operation response
db.User.hasMany(db.Emergency, {
  foreignKey: "responderId",
  allowNull: true,
});
db.Emergency.belongsTo(db.User, {
  foreignKey: "responderId",
  allowNull: true,
});
//Association Between Emergencies and Emergency Type
db.EmergencyType.hasMany(db.Emergency, {
  foreignKey: "typeId",
  allowNull: false,
  as: "Emergencies",
});
db.Emergency.belongsTo(db.EmergencyType, {
  foreignKey: "typeId",
  allowNull: false,
  as: "Types",
});

module.exports = db;
