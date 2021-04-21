const express = require("express");
const cors = require("cors");
const passport = require("passport");
const app = express();
const db = require("./db/models");

//Routers Require
const User = require("./src/routers/User");
const Type = require("./src/routers/EmergencyType");
const Panick = require("./src/routers/Emergency");

//Passoprt Strategies
const { localStrategy, jwtStrategy } = require("./src/middleware/passport");

//Middleware
app.use(cors());
app.use(express.json());
app.use((err, _, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
  console.log(err);
  next(err);
});

//Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routes
app.use("/", User);
app.use("/", Type);
app.use("/", Panick);
//multer

//App Start
const run = async () => {
  try {
    await db.sequelize.sync({ force: false });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
  await app.listen(process.env.PORT);
};

run();
