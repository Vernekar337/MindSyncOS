import validator from "validator";

export const validateSignUpData = (req) => {
  const { email, password, firstName, lastName, dateOfBirth, role, phone } =
    req.body;

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Your password is not strong enough !");
  } else if (!["male", "female", "other"].includes(gender.toLowerCase())) {
    throw new Error("Gender is not Valid !");
  }
};

export const validateEditData = (req) => {
  const validEdits = [
    "email",
    "firstName",
    "lastName",
    "dateOfBirth",
    "role",
    "phone",
  ];
  const isAllowed = Object.keys(req.body).every((key) =>
    validEdits.includes(key)
  );
  return isAllowed;
};

export const validatePasswordChange = (req) => {
  const { password } = req.body;
  if (!validator.isStrongPassword(password)) {
    throw new Error("Your new password is not strong enough !");
  }
};
