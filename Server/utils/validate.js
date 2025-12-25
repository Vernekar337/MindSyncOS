const validator = require('validator');

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password, gender, age, skills, about } = req.body;
  
  if(!validator.isEmail(email)){
        throw new Error("Email is not valid!")
      }

  else if(!validator.isStrongPassword(password)){
        throw new Error("Your password is not strong enough !")
      }
  else if(!["male", "female", "other"].includes(gender.toLowerCase())){
        throw new Error("Gender is not Valid !")
  }
};

const validateEditData = (req) => {
  const validEdits = [
    "firstName",
    "lastName",
    "email",
    "gender",
    "age",
    "skills",
    "about",
    "photoUrl",
  ]
  const isAllowed = Object.keys(req.body).every((key) => validEdits.includes(key));
  return isAllowed;
}

const validatePasswordChange = (req) => {
  const {password} = req.body;
  if(!validator.isStrongPassword(password)){
        throw new Error("Your new password is not strong enough !")
      }
}


module.exports = { validateSignUpData, validateEditData, validatePasswordChange };