const express = require('express');
const authRouter = express.Router();
const User = require("../model/user");
const { validateSignUpData } = require("../utils/validate");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

authRouter.post("/signup", async (req, res) =>{
  try{
    const { firstName, lastName, email, imageUrl, password, gender, age, skills, about } = req.body;
    validateSignUpData(req);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User ({
      firstName, 
      lastName, 
      email, 
      imageUrl,
      password : passwordHash, 
      gender, 
      age, 
      skills, 
      about
    });
    await user.save();
    res.send(user)
  }catch(err){
    res.status(400).send("User not Registered, please try again!"+ err.message);
}
});

authRouter.post("/login", async (req, res) =>{
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ email });
    if(!user){
      throw new Error("User not found!")
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(isPasswordCorrect){
      const token = await jwt.sign({ _id : user._id }, "SahloFolina337")
      res.cookie("token", token);
      res.send(user);
    } else {
    throw new Error("Incorrect Password!");
    }

  }catch(err){
    res.status(400).send(err.message);
  }
  
})

authRouter.post("/logout", async (req, res) =>{
  try{
    res.clearCookie("token");
    res.send("User logged out successfully!");
  }
  catch(err){
    res.status(400).send("Logout Failed, please try again!"+ err.message);
  }
})

module.exports = authRouter;
