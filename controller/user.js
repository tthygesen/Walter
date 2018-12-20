const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validation = require("../validation/register");
const empty = require("is-empty");

exports.validateRegister = (req, res, next) => {
  const { errors } = validation(req.body);
  if (!empty(errors)) {
    return res.status(400).json(errors);
  }
  next();
};

exports.register = async (req, res) => {
  //Get values from form
  const email = req.body.email;
  const password = req.body.password;

  //Check if email exsist
  const user = await User.findOne({ email }).catch(err => {
    console.log(err);
  });
  if (user) {
    return res.status(400).json({ error: "email already exsists" });
  } else {
    //make user
    const newUser = new User({
      email: email,
      password: password
    });

    //hash password
    bcrypt.genSalt(15, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        //resplace old password with hashed
        newUser.password = hash;

        //save user
        newUser
          .save()
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  }
};

//User login
//POST /login
//public
exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //check if user exsists
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
    //TODO: put secretkey in env file
    const secretkey = "redrum";
    jwt.sign(payload, secretkey, { expiresIn: 3600 }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token
      });
    });
  } else {
    return res.status(400).json({ error: "password incorret" });
  }
};

//Current user
//GET /login
//Private
exports.currentUser = (req, res) => {
  //if success user is put in req
  res.json({
    id: req.user.id,
    email: req.user.email
  });
};
