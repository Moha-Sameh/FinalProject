const { Emergency, User, EmergencyType } = require("../../db/models");

//Find Emergency by PK
exports.findEmergency = async (id, next) => {
  try {
    const emergency = await Emergency.findByPk(id);
    return emergency;
  } catch (error) {
    next(error);
  }
};

//MiddleWare to find Emergency Type by ID
exports.findType = async (req, _, next) => {
  try {
    const type = await EmergencyType.findOne({
      where: {
        type: req.body.type,
      },
    });
    req.type = type;
    next();
  } catch (error) {
    next(error);
  }
};

//MiddleWare to find User by ID
exports.findUser = async (req, _, next) => {
  try {
    const requester = await User.findOne({
      where: {
        username: req.user.username,
      },
    });
    req.requester = requester;
    next();
  } catch (error) {
    next(error);
  }
};

//New Emergency request by User
exports.emergencyRequest = async (req, res, next) => {
  try {
    req.body.typeId = req.type.id;
    req.body.requesterId = req.user.id;
    const newRequest = await Emergency.create(req.body);
    res.json(newRequest);
  } catch (error) {
    next(error);
  }
};

exports.viewEmergency = async (req, res, next) => {
  try {
    const Emergencies = await Emergency.findAll({
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "id",
          "requesterId",
          "responderId",
          "typeId",
        ],
      },
      include: [
        {
          model: EmergencyType,
          as: "Types",
          attributes: { exclude: ["risk", "id", "createdAt", "updatedAt"] },
        },
        {
          model: User,
          as: "Requester",
          attributes: {
            exclude: [
              "id",
              "createdAt",
              "updatedAt",
              "password",
              "username",
              "role",
            ],
          },
        },
      ],
    });
    res.json(Emergencies);
  } catch (error) {
    next(error);
  }
};