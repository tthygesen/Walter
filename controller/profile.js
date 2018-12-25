const mongooes = require("mongoose");
const Profile = require("../models/Profile");

exports.userProfile = async (req, res) => {
  //res.send(req.user);
  const profile = await Profile.findOne({ user: req.user.id }).catch(err => {
    res.status(400).json(err);
  });
  if (!profile) {
    res.status(404).json({ error: "profile not found" });
  }
  res.json(profile);
};

exports.createProfile = async (req, res) => {
  const profileFields = {};

  profileFields.user = req.user.id;
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

  //Picture
  //if (req.files.picture) profileFields.picture = req.files.picture;

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
    const newProfile = await new Profile(profileFields).save().catch(err => {
      res.status(400).json({ error: err });
    });
    if (newProfile) res.json(newProfile);
  }
};

//Create work experience
exports.createWorkExperience = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).catch(err => {
    console.log(err);
  });
  if (profile) {
    const newExperience = {
      position: req.body.position,
      company: req.body.company,
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
    const experience = await profile.skills
      .map(item => item.id)
      .indexOf(req.params.skill_id);

    profile.skills.splice(experience, 1);

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
      .indexOf(req.params.edu_id);

    profile.workexperience.splice(experience, 1);

    const theProfile = await profile.save().catch(err => {
      console.log(err);
    });
    if (theProfile) res.json(theProfile);
  }
};
