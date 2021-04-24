const { EmergencyType } = require("../../db/models");
// Find Type by PK
exports.findType = async (id, next) => {
  try {
    const type = await EmergencyType.findByPk(id);
    return type;
  } catch (error) {
    next(error);
  }
};

exports.createType = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newType = await EmergencyType.create(req.body);
    res.json(newType);
  } catch (error) {
    next(error);
  }
};

exports.emergencyTypes = async (req, res, next) => {
  try {
    const typeList = await EmergencyType.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "id"] },
    });
    res.json(typeList);
  } catch (error) {
    next(error);
  }
};
