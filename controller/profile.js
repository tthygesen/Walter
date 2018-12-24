const Profile = require("../models/Profile");
exports.useProfile = async (req, res) => {
  const user = req.user.id;
  const profile = await Profile.findById(user).catch(err => {
    console.log(err);
  });
  if (profile) res.json(profile);
};
