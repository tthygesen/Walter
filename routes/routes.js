const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controller/user");
const profileController = require("../controller/profile");

const api = "api";
//USER ROUTS
router.post("/api/register", userController.validateRegister, userController.register);
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
//Skills
router.post(
  "/api/profile/skill",
  passport.authenticate("jwt", { session: false }),
  profileController.createSkill
);
router.delete(
  "/api/profile/skill/:skill_id",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteSkill
);
// Experience
router.post(
  "/api/profile/experience",
  passport.authenticate("jwt", { session: false }),
  profileController.createWorkExperience
);
router.delete(
  "/api/profile/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteExperience
);
// Education
router.post(
  "/api/profile/education",
  passport.authenticate("jwt", { session: false }),
  profileController.createEducation
);
router.delete(
  "/api/profile/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteEducation
);

//Search
router.get("/api/search", profileController.searchProfiles);

module.exports = router;
