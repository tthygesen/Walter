const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controller/user");
const profileController = require("../controller/profile");

//USER ROUTS
//regiser
router.post(
  "/api/register",
  userController.validateRegister,
  userController.register
);
//login
router.post("/api/login", userController.validateLogin, userController.login);

//PROFILE ROUTS
router.get("/api/candidate/:acc_id", profileController.seeProfile);
router.get(
  "/api/profile",
  passport.authenticate("jwt", { session: false }),
  profileController.userProfile
);
router.post(
  "/api/profile",
  passport.authenticate("jwt", { session: false }),
  profileController.uploade,
  profileController.rezise,
  profileController.createProfile
);
router.delete(
  "/api/profile",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteProfile
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
router.get("/api/profiles", profileController.searchProfiles);

module.exports = router;
