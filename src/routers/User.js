const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  findUser,
  signIn,
  signUp,
  usertable,
  operationtable,
} = require("../controllers/User");
const upload = require("../middleware/multer");
//Controller Required

//Param
router.param("id", async (req, _, next, id) => {
  const user = await findUser(id, next);
  user ? ((req.user = user), next()) : (err = new Error("User ID not found"));
  err.status = 404;
  next(err);
});

//Routes
router.get("/user", usertable);
router.get("/operation", operationtable);
router.post("/signup", upload.single("image"), signUp);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);

module.exports = router;
