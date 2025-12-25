const mongoose = require("mongoose")
const validator = require("validator");

const userSchema = mongoose.Schema({
  firstName : {
    type: String,
    required: true,
  },
  lastName : {
    type: String,
    minLength: 1,
  },
  email : {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password : {
    type: String,
    unique: true,
    required: true,
    minLength: 8,
  },
  photoUrl: {
    type: String,
  },
  gender : {
    type: String,
    trim: true,
    lowercase: true
  },
  age : {
    type: Number,
    min: 18,
  },
  skills: {
    type: [String],
  },
  about : {
    type: String,
    default: "Hey there! I am using DevTinder.",
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);