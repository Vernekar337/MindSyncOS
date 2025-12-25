const mongoose = require("mongoose")
const validator = require("validator");

const userSchema = mongoose.Schema({
  _id: ObjectId,
  
  // Basic Information
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
  
  // Verification & Security
  emailVerified: {
    type: Boolean,
    default: false,
    index: true
  },
  emailVerificationToken: {
    type: String,
    default: null,
    select: false
  },
  emailVerificationTokenExpiry: {
    type: Date,
    default: null,
    select: false
  },
  passwordResetToken: {
    type: String,
    default: null,
    select: false
  },
  passwordResetTokenExpiry: {
    type: Date,
    default: null,
    select: false
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: {
    type: String,
    select: false,
    default: null
  },
  
  // Preferences
  preferredLanguage: {
    type: String,
    enum: ['en', 'hi', 'mr', 'ta', 'te', 'kn', 'ml'],
    default: 'en'
  },
  timezone: {
    type: String,
    default: 'Asia/Kolkata'
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'auto'
  },
  notificationPreferences: {
    email: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: true
    },
    inApp: {
      type: Boolean,
      default: true
    },
    appointmentReminders: {
      type: Boolean,
      default: true
    },
    communityUpdates: {
      type: Boolean,
      default: true
    }
  },
  
  // Status & Account
  accountStatus: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'deleted'],
    default: 'active',
    index: true
  },
  suspensionReason: {
    type: String,
    default: null
  },
  suspensionEndDate: {
    type: Date,
    default: null
  },
  lastLogin: {
    type: Date,
    default: null,
    index: true
  },
  loginAttempts: {
    type: Number,
    default: 0,
    select: false
  },
  lockUntil: {
    type: Date,
    default: null,
    select: false
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
  }});

module.exports = mongoose.model("User", userSchema);