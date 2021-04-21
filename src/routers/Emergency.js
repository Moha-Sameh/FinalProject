const express = require("express");
const passport = require("passport");
const {
  findEmergency,
  viewEmergency,
  findType,
  findUser,
  emergencyRequest,
} = require("../controllers/Emergency");
const router = express.Router();

//Param
router.param("id", async (req, res, next, id) => {
  const emergency = await findEmergency(id, next);
  emergency
    ? ((req.emergency = emergency), next())
    : (err = new Error("Emergency ID not found"));
  err.status = 404;
  next(err);
});

//Routes
router.get("/emergencies", viewEmergency);
router.post(
  "/emergency",
  passport.authenticate("jwt", { session: false }),
  findType,
  findUser,
  emergencyRequest
);

module.exports = router;