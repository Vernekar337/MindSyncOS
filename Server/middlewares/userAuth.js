import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies;

    const { token } = cookie;
    if (!token) {
      res.status(401).send("Please login!!");
    }
    const decoded = jwt.verify(token, "SahloFolina337");
    const { _id } = decoded;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found!");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(404).send("Something went wrong!");
  }
};
