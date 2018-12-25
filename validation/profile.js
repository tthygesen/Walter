const validator = require("validator");
const profileValidation = reqBody => {
  const errors = {};
  switch (true) {
    case validator.isEmpty(reqBody.email):
      errors.error = "Please supply a email";
      break;
    case !validator.isEmail(reqBody.email):
      errors.error = "Email must be valid email";
      break;
    case validator.isEmpty(reqBody.password):
      errors.error = "Please supply a password";
      break;
    case !validator.isLength(reqBody.password, { min: 6, max: 18 }):
      errors.error = "password length must be between 6 or 18";
      break;
    case validator.isEmpty(reqBody.password2):
      errors.error = "Please make the two password match";
      break;
    case !validator.equals(reqBody.password, reqBody.password2):
      errors.error = "Passwords does not match";
      break;
    default:
      return { errors };
  }
  return { errors };
};

module.exports = profileValidation;
