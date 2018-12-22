const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controller/user");
const profileController = require("../controller/profile");

const api = "api";
router.post("/api/register", userController.validateRegister, userController.register);
router.post("/api/login", userController.validateLogin, userController.login);
router.get(
  "/api/profile",
  passport.authenticate("jwt", { session: false }),
  profileController.useProfile
);
router.get(
  "/api/current",
  passport.authenticate("jwt", { session: false }),
  userController.currentUser
);

router.post("/validate", userController.validateRegister);

module.exports = router;
