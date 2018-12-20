const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controller/user");

const api = "api";
router.post(
  "/api/register",
  userController.validateRegister,
  userController.register
);
router.post("/api/login", userController.login);
router.get(
  "/api/current",
  passport.authenticate("jwt", { session: false }),
  userController.currentUser
);

router.post("/validate", userController.validateRegister);

module.exports = router;
