const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controller/user");
const profileController = require("../controller/profile");

const api = "api";
//USER ROUTS
router.post(
  "/api/register",
  userController.validateRegister,
  userController.register
);
router.post("/api/login", userController.validateLogin, userController.login);

//PROFILE ROUTS
router.get(
  "/api/profile",
  passport.authenticate("jwt", { session: false }),
  profileController.userProfile
);
router.post(
  "/api/profile",
  passport.authenticate("jwt", { session: false }),
  profileController.createProfile
);

router.get(
  "/api/current",
  passport.authenticate("jwt", { session: false }),
  userController.currentUser
);

router.post("/validate", userController.validateRegister);

module.exports = router;
