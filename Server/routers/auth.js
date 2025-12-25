import express from "express";
const authRouter = express.Router();
import User from "../model/user.js";
import { validateSignUpData } from "../utils/validate.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

authRouter.post("/auth/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName, dateOfBirth, role, phone } =
      req.body;
    validateSignUpData(req);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: passwordHash,
      firstName,
      lastName,
      dateOfBirth,
      role,
      phone,
    });
    await user.save();
    res.json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res
      .status(400)
      .send("User not Registered, please try again!" + err.message);
  }
});

authRouter.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found!");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const token = await jwt.sign({ _id: user._id }, "SahloFolina337");
      res.cookie("token", token);
      res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar,
        },
      });
    } else {
      throw new Error("Incorrect Password!");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(400).send("Logout Failed, please try again!" + err.message);
  }
});

export default authRouter;
