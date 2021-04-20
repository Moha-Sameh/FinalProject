const { User } = require("../../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      req.body.image = 'http://${req.get("host)}/media/${req.file.filename}';
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + process.env.JWT_EXPIRATION_MS,
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
      username: user.usernam,
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
