const validator = require("validator");
const loginValidation = reqBody => {
  const errors = {};
  switch (true) {
    case validator.isEmpty(reqBody.email):
      errors.error = "Please supply an email";
      break;
    case !validator.isEmail(reqBody.email):
      errors.error = "Email must be valid email";
      break;
    case validator.isEmpty(reqBody.password):
      errors.error = "Please supply a password";
      break;
    case !validator.isLength(reqBody.password, { min: 6, max: 18 }):
      errors.error = "password length should be between 6 or 18";
      break;
  }
  return { errors };
};

module.exports = loginValidation;
