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

exports.createWorkExperience = async (req, res) => {
  const WorkExperience = {};
  if (req.body.position) WorkExperience.position = req.body.position;
  if (req.body.company) WorkExperience.company = req.body.company;
  //start year and month
  WorkExperience.start = {};
  if (req.body.year) WorkExperience.start.year = req.body.year;
  if (req.body.month) WorkExperience.start.month = req.body.month;
  //end year and month
  WorkExperience.end = {};
  if (req.body.year) WorkExperience.end.year = req.body.year;
  if (req.body.month) WorkExperience.end.month = req.body.month;

  const profile = await new Profile.findOne({ user: req.user.id }).catch(err => {
    console.log(err);
  });
  if(profile){
    //create / update work experience
    //const we = await new profile.
  }
};
