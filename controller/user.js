const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const registerValidation = require("../validation/register");
const loginValidation = require("../validation/login");
const empty = require("is-empty");
const keys = require("../config/keys");

/**************************************/
/* Register controller and validation */
/**************************************/
exports.validateRegister = (req, res, next) => {
  const { errors } = registerValidation(req.body);
  if (!empty(errors)) {
    return res.status(400).json(errors);
  }
  next();
};

exports.register = async (req, res) => {
  //Get values from form
  const email = req.body.email;
  const password = req.body.password;

  //Check if email exists
  const user = await User.findOne({ email }).catch(err => {
    console.log(err);
  });
  if (user) {
    return res.status(400).json({ error: "email already exists" });
  } else {
    //make user and profile
    const newUser = new User({
      email: email,
      password: password
    });
    const newProfile = new Profile({});

    //hash password
    bcrypt.genSalt(15, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;

        //replace old password with hashed
        newUser.password = hash;

        //save user and profile
        const user = await newUser.save().catch(err => {
          console.log(err);
        });
        /* await newProfile.save().catch(err => {
          console.log(err);
        }); */
        if (user) {
          res.json(user);
        }
      });
    });
  }
};

/***********************************/
/* Login controller and validation */
/***********************************/
exports.validateLogin = (req, res, next) => {
  const { errors } = loginValidation(req.body);
  if (!empty(errors)) {
    return res.status(400).json(errors);
  }
  next();
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //check if user exists
  const user = await User.findOne({ email }).catch(err => {
    console.log(err);
  });
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  //check password
  const pwMatch = await bcrypt.compare(password, user.password).catch(err => {
    console.log(err);
  });
  if (pwMatch) {
    const payload = {
      id: user.id,
      email: user.email
    };
    const secretkey = keys.secretkey;
    jwt.sign(payload, secretkey, { expiresIn: 3600 }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token
      });
    });
  } else {
    return res.status(400).json({ error: "password incorrect" });
  }
};

// current user - only for testing
exports.currentUser = (req, res) => {
  //if success user is put in req
  res.json({
    id: req.user.id,
    email: req.user.email
  });
};
