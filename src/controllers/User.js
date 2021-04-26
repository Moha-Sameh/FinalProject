const { User } = require("../../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

//Find A user by PK
exports.findUser = async (id, next) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    next(error);
  }
};

//SignUp User Controller
exports.signUp = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      firstName: newUser.firstName,
      username: newUser.username,
      role: newUser.role,
      image: newUser.image,
      exp: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
    };
    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
//SignIn User Controller
exports.signIn = (req, res, next) => {
  try {
    const { user } = req;
    const payload = {
      id: user.id,
      firstName: user.firstName,
      username: user.username,
      role: user.role,
      image: user.image,
      exp: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
    };
    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

//Find all application users
exports.usertable = async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        role: null,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "role"],
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.operationtable = async (req, res, next) => {
  try {
    const operationTeam = await User.findAll({
      where: {
        role: {
          [Op.not]: null,
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    res.json(operationTeam);
  } catch (error) {
    next(error);
  }
};
