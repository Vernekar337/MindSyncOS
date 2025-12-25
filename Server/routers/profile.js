import express from "express";
const profileRouter = express.Router();
import { userAuth } from "../middlewares/userAuth.js";
import { validateEditData, validatePasswordChange } from "../utils/validate.js";
import bcrypt from "bcrypt";

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("Something went wrong!");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditData(req)) {
      throw new Error("Invalid updates!");
    }
    // validateSignUpData(req);
    const userData = req.user;
    Object.keys(req.body).forEach((key) => (userData[key] = req.body[key]));

    await userData.save();
    res.send(userData);
  } catch (err) {
    res
      .status(400)
      .send("Profile not updated, please try again!" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { password } = req.body;

    const isUpdateValid = await bcrypt.compare(password, user.password);
    if (isUpdateValid) {
      throw new Error("New password must be different from old password!");
    }
    validatePasswordChange(req);
    const newPasswordHash = await bcrypt.hash(password, 10);
    user.password = newPasswordHash;
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send("Password not changed, " + err.message);
  }
});

export default profileRouter;
