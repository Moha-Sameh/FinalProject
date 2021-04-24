const express = require("express");
const passport = require("passport");
const {
  findEmergency,
  viewEmergency,
  findType,
  findUser,
  emergencyRequest,
  respondEmergency,
} = require("../controllers/Emergency");
const upload = require("../middleware/multer");

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
router.get("/emergency", viewEmergency);
router.post(
  "/emergency",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  findType,
  findUser,
  emergencyRequest
);
router.put(
  "/emergency/:id",
  passport.authenticate("jwt", { session: false }),
  findUser,
  respondEmergency
);

module.exports = router;
