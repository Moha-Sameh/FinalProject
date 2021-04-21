const express = require("express");
const router = express.Router();
const {
  findType,
  createType,
  emergencyTypes,
} = require("../controllers/EmergencyType");

//Param
router.param("id", async (req, _, next, id) => {
  const type = await findType(id, next);
  type ? ((req.type = type), next()) : (err = new Error("Type not found"));
  err.status = 404;
  next(err);
});

//Routes
router.get("/type", emergencyTypes);
router.post("/type", createType);

module.exports = router;
