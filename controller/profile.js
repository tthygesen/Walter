const Profile = require("../models/Profile");
const User = require("../models/User");
const _ = require("lodash");
const jimp = require("jimp");
const uuid = require("uuid");
const multer = require("multer");
const multerOption = {
  storage: multer.memoryStorage(),
  fileFilter: function(req, file, next) {
    const photo = file.mimetype.startsWith("image/");
    if (photo) {
      next(null, true);
    } else {
      next({ msg: "that filetype is not allowded!" }, false);
    }
  }
};

exports.userProfile = async (req, res) => {
  //res.send(req.user);
  const profile = await Profile.findOne({ user: req.user.id }).catch(err => {
    res.status(400).json(err);
  });
  if (!profile) {
    res.status(404).json({ error: "profile not found" });
  } else {
    res.json(profile);
  }
};

exports.uploade = multer(multerOption).single("photo");

exports.rezise = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const photoExtension = req.file.mimetype.split("/")[1];
  req.body.photo = `${uuid.v4()}.${photoExtension}`;
  const photo = await jimp.read(req.file.buffer).catch(err => {
    console.log(err);
  });
  await photo.resize(500, jimp.AUTO);
  await photo.write(`./public/photos/pp/${req.body.photo}`);

  next();
};

exports.deleteProfile = async (req, res) => {
  const userID = req.user._id;
  await Profile.findOneAndDelete({ user: userID }).catch(err => {
    return res.status(400).json({ error: "Could not delete profile" });
  });
  await User.findByIdAndDelete(userID).catch(err => {
    return res.status(400).json({ error: "Could not delete user" });
  });
  res.json({ sucsses: "Account was delete" });
};

exports.updateProfile = async (req, res) => {
  const profileFields = {};

  profileFields.user = req.user.id;
  if (req.body.photo) profileFields.photo = req.body.photo;
  if (req.body.name) profileFields.name = req.body.name;
  if (req.body.lastname) profileFields.lastname = req.body.lastname;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.bio) profileFields.bio = req.body.bio;

  //Contact
  profileFields.contact = {};
  if (req.body.email) profileFields.contact.email = req.body.email;
  if (req.body.phone) profileFields.contact.phone = req.body.phone;
  if (req.body.website) profileFields.contact.website = req.body.website;

  //Living
  profileFields.living = {};
  if (req.body.country) profileFields.living.country = req.body.country;
  if (req.body.city) profileFields.living.city = req.body.city;

  //Social medias
  profileFields.socials = {};
  if (req.body.facebook) profileFields.socials.facebook = req.body.facebook;
  if (req.body.twitter) profileFields.socials.twitter = req.body.twitter;
  if (req.body.linkedin) profileFields.socials.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.socials.instagram = req.body.instagram;

  //Create or update profile
  const profile = await Profile.findOne({ user: req.user.id }).catch(err => {
    console.log(err);
  });
  if (profile) {
    const id = req.user.id;
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: id },
      { $set: profileFields },
      { new: true }
    ).catch(err => {
      console.log(err);
    });
    if (updatedProfile) res.json(updatedProfile);
  } else {
    //create
    res.json({ msg: "user not found" });
    /* const newProfile = await new Profile(profileFields).save().catch(err => {
      res.status(400).json({ error: err });
    });
    if (newProfile) res.json(newProfile); */
  }
};

exports.createProfile = async (req, res) => {
  const profileFields = {
    contact: {},
    living: {},
    socials: {}
  };
  profileFields.user = res.locals.user._id;
  profileFields.name = "";
  profileFields.lastname = "";
  profileFields.status = "";
  profileFields.bio = "";

  //Contact
  profileFields.contact.email = "";
  profileFields.contact.phone = "";
  profileFields.contact.website = "";

  //Living
  profileFields.living.country = "";
  profileFields.living.city = "";

  //Socials
  profileFields.socials.facebook = "";
  profileFields.socials.twitter = "";
  profileFields.socials.linkedin = "";
  profileFields.socials.instagram = "";

  const newProfile = await new Profile(profileFields).save().catch(err => {
    res.status(400).json({ error: err });
  });
  if (newProfile) {
    const user = res.locals.user;
    res.json(user);
  }
};

//Create work experience
exports.createWorkExperience = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).catch(err => {
    console.log(err);
  });
  if (profile) {
    const newExperience = {
      position: req.body.what,
      company: req.body.where,
      start: {
        month: req.body.startmonth,
        year: req.body.startyear
      },
      end: {
        month: req.body.endmonth,
        year: req.body.endyear
      },
      current: req.body.current
    };
    profile.workexperience.unshift(newExperience);
    const theProfile = await profile.save().catch(err => {
      console.log(err);
    });
    if (theProfile) res.json(theProfile);
  }
};

//Create an education
exports.createEducation = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).catch(err => {
    console.log(err);
  });
  if (profile) {
    const newEducation = {
      school: req.body.school,
      country: req.body.country,
      start: {
        month: req.body.startmonth,
        year: req.body.startyear
      },
      end: {
        month: req.body.endmonth,
        year: req.body.endyear
      },
      current: req.body.current
    };
    profile.educations.unshift(newEducation);
    const theProfile = await profile.save().catch(err => {
      console.log(err);
    });
    if (theProfile) res.json(theProfile);
  }
};

//Create an education
exports.createSkill = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).catch(err => {
    console.log(err);
  });
  if (profile) {
    const newSkill = {
      skill: req.body.skill,
      years: req.body.years
    };
    profile.skills.unshift(newSkill);
    const theProfile = await profile.save().catch(err => {
      console.log(err);
    });
    if (theProfile) res.json(theProfile);
  }
};

//Delete a skill
exports.deleteSkill = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).catch(err => {
    console.log(err);
  });
  if (profile) {
    //console.log(req.params);
    const skill = await profile.skills
      .map(item => item.id)
      .indexOf(req.params.skill_id);

    profile.skills.splice(skill, 1);

    const theProfile = await profile.save().catch(err => {
      console.log(err);
    });
    if (theProfile) res.json(theProfile);
  }
};

//Delete an education
exports.deleteEducation = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).catch(err => {
    console.log(err);
  });
  if (profile) {
    const education = await profile.educations
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    profile.educations.splice(education, 1);

    const theProfile = await profile.save().catch(err => {
      console.log(err);
    });
    if (theProfile) res.json(theProfile);
  }
};

//Delete an experience
exports.deleteExperience = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).catch(err => {
    console.log(err);
  });
  if (profile) {
    const experience = await profile.workexperience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.workexperience.splice(experience, 1);

    const theProfile = await profile.save().catch(err => {
      console.log(err);
    });
    if (theProfile) res.json(theProfile);
  }
};

//Search names
exports.searchName = async (req, res, next) => {
  //If query is empty return all users
  const query = _.isEmpty(req.query.q);
  if (query) {
    let profiles = await Profile.find().catch(err => {
      console.log(err);
    });
    res.json(profiles);
    return;
  }
  //Find user
  let profiles = await Profile.find({
    $text: {
      $search: req.query.q
    }
  }).catch(err => console.log(err));
  if (_.isEmpty(profiles)) {
    next();
  } else {
    res.json(profiles);
  }
};

exports.searchSkills = async (req, res) => {
  //Find user by skill
  const query = req.query.q;
  console.log(query);
  const profiles = await Profile.find({
    skills: { $all: { $elemMatch: { skill: `${query}` } } }
  }).catch(err => console.log(err));

  if (_.isEmpty(profiles)) {
    res.json([]);
  } else {
    res.json(profiles);
  }
};

//See a users profile
exports.seeProfile = async (req, res) => {
  const id = req.params.acc_id;
  const profile = await Profile.findOne({ user: id }).catch(err => {
    res.status(404).json({ err: "Could not get to the user" });
  });
  if (profile) {
    res.json(profile);
  }
};
