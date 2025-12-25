const mongoose = require("mongoose")
const validator = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
    validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    // Stored as bcrypt hash (rounds: 10)
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  
  // User Type & Role
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin', 'guardian'],
    required: true,
    index: true
  },
  
  // Personal Details
  dateOfBirth: {
    type: Date,
    required: function() { return this.role === 'patient'; }
  },
  phone: {
    type: String,
    validate: /^\+?[1-9]\d{1,14}$/,
    sparse: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary', 'prefer_not_to_say'],
    sparse: true
  },
  avatar: {
    type: String,
    default: null,
    // URL to S3 or CDN
  },
  bio: {
    type: String,
    maxlength: 500,
    default: null
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'auto'
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null,
    sparse: true
  }
});

module.exports = mongoose.model("User", userSchema);