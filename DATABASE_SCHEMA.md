# 💾 MindSync OS - Complete Database Schema

## Overview

MindSync OS uses **MongoDB** as the primary database for its flexibility with diverse data types (text, audio, video metadata, chat logs, etc.).

**Database**: `mindsync`
**Collections**: 15 core collections
**Total Indexes**: 40+

---

## 📋 Collections Index

1. [users](#users-collection)
2. [doctors](#doctors-collection)
3. [appointments](#appointments-collection)
4. [sessions](#sessions-collection)
5. [chat_messages](#chat_messages-collection)
6. [vocal_journals](#vocal_journals-collection)
7. [community_posts](#community_posts-collection)
8. [post_comments](#post_comments-collection)
9. [post_reactions](#post_reactions-collection)
10. [guardian_access](#guardian_access-collection)
11. [relaxation_activities](#relaxation_activities-collection)
12. [emotion_data](#emotion_data-collection)
13. [prescriptions](#prescriptions-collection)
14. [notifications](#notifications-collection)
15. [audit_logs](#audit_logs-collection)

---

## 👥 USERS Collection

**Collection Name**: `users`

**Purpose**: Store all user accounts (Patients, Doctors, Admins, Guardians)

**Schema**:
```javascript
{
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
  }
}
```

**Indexes**:
- `{ email: 1 }` (unique)
- `{ role: 1 }`
- `{ accountStatus: 1 }`
- `{ createdAt: -1 }`
- `{ emailVerified: 1 }`

**Validation Rules**:
- Email: Valid email format, unique
- Password: Min 8 chars, 1 uppercase, 1 number, 1 special char
- Phone: Valid international format (optional)
- Role: One of enum values

---

## 👨‍⚕️ DOCTORS Collection

**Collection Name**: `doctors`

**Purpose**: Store doctor-specific information, qualifications, availability

**Schema**:
```javascript
{
  _id: ObjectId,
  
  // Link to User
  userId: {
    type: ObjectId,
    ref: 'users',
    required: true,
    unique: true,
    index: true
  },
  
  // Professional Information
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  licenseVerified: {
    type: Boolean,
    default: false
  },
  licenseVerificationDate: {
    type: Date,
    default: null
  },
  licenseExpiryDate: {
    type: Date,
    required: true
  },
  medicalRegistrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Specializations
  specializations: [{
    type: String,
    enum: ['depression', 'anxiety', 'adhd', 'ptsd', 'ocd', 'eating_disorders', 
            'addiction', 'relationship', 'stress_management', 'bipolar', 
            'schizophrenia', 'trauma', 'grief_loss', 'adolescent', 'child'],
    required: true
  }],
  
  // Qualifications
  qualifications: [{
    degree: {
      type: String,
      required: true,
      // e.g., "M.D. Psychiatry", "M.Sc. Clinical Psychology"
    },
    institution: {
      type: String,
      required: true
    },
    yearObtained: {
      type: Number,
      required: true
    }
  }],
  
  // Certifications
  certifications: [{
    name: {
      type: String,
      required: true,
      // e.g., "CBT Certified", "Trauma-Informed Therapy"
    },
    issuingBody: {
      type: String,
      required: true
    },
    certificationNumber: {
      type: String,
      required: true
    },
    issueDate: {
      type: Date,
      required: true
    },
    expiryDate: {
      type: Date,
      default: null
    }
  }],
  
  // Practice Information
  languages: [{
    type: String,
    enum: ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
    required: true
  }],
  
  consultationFee: {
    type: Number,
    required: true,
    min: 100
  },
  currency: {
    type: String,
    default: 'INR'
  },
  
  sessionDuration: {
    type: Number,
    default: 45,
    // in minutes
  },
  
  // Availability
  availability: {
    // Working days (0-6, 0=Sunday)
    workingDays: [Number],
    
    // Time slots
    slots: [{
      dayOfWeek: Number,
      startTime: String, // HH:mm format
      endTime: String    // HH:mm format
    }],
    
    // Blackout dates (holidays, leaves)
    blackoutDates: [{
      startDate: Date,
      endDate: Date,
      reason: String
    }],
    
    // Next available appointment
    nextAvailableSlot: Date,
    
    // Max concurrent appointments
    maxDailySessions: {
      type: Number,
      default: 8
    }
  },
  
  // Ratings & Reviews
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    distribution: {
      five: { type: Number, default: 0 },
      four: { type: Number, default: 0 },
      three: { type: Number, default: 0 },
      two: { type: Number, default: 0 },
      one: { type: Number, default: 0 }
    }
  },
  
  // Statistics
  statistics: {
    totalPatients: {
      type: Number,
      default: 0
    },
    totalSessions: {
      type: Number,
      default: 0
    },
    completedSessions: {
      type: Number,
      default: 0
    },
    averageSessionRating: {
      type: Number,
      default: 0
    },
    cancellationRate: {
      type: Number,
      default: 0
    }
  },
  
  // Verification Status
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
    index: true
  },
  verificationNotes: String,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes**:
- `{ userId: 1 }` (unique)
- `{ licenseNumber: 1 }` (unique)
- `{ specializations: 1 }`
- `{ verificationStatus: 1 }`
- `{ "rating.average": -1 }`

---

## 📅 APPOINTMENTS Collection

**Collection Name**: `appointments`

**Purpose**: Store appointment bookings

**Schema**:
```javascript
{
  _id: ObjectId,
  
  // Participants
  patientId: {
    type: ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  doctorId: {
    type: ObjectId,
    ref: 'doctors',
    required: true,
    index: true
  },
  
  // Appointment Details
  scheduledTime: {
    type: Date,
    required: true,
    index: true
  },
  endTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    default: 45
  },
  reason: {
    type: String,
    required: true,
    maxlength: 500
  },
  
  // Mode
  mode: {
    type: String,
    enum: ['video', 'audio', 'in-person'],
    default: 'video'
  },
  location: {
    type: String,
    default: 'Online'
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show', 'rescheduled'],
    default: 'pending',
    index: true
  },
  
  // Medical Information
  previousTreatment: String,
  medicationsCurrently: String,
  patientNotes: String,
  
  // Session Information
  sessionId: {
    type: ObjectId,
    ref: 'sessions',
    default: null
  },
  
  // Doctor's Notes (Post-appointment)
  doctorNotes: {
    type: String,
    default: null
  },
  prescriptionId: {
    type: ObjectId,
    ref: 'prescriptions',
    default: null
  },
  
  // Payment
  fee: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDate: Date,
  transactionId: String,
  
  // Rescheduling
  originalAppointmentId: {
    type: ObjectId,
    ref: 'appointments',
    default: null
  },
  rescheduleCount: {
    type: Number,
    default: 0
  },
  lastRescheduledAt: Date,
  
  // Cancellation
  cancelledAt: Date,
  cancellationReason: String,
  cancelledBy: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    default: null
  },
  refundStatus: {
    type: String,
    enum: ['pending', 'processed', 'failed'],
    default: null
  },
  refundAmount: {
    type: Number,
    default: null
  },
  
  // Reminders
  reminders: {
    email24hSent: {
      type: Boolean,
      default: false
    },
    email1hSent: {
      type: Boolean,
      default: false
    },
    smsSent: {
      type: Boolean,
      default: false
    }
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
  completedAt: Date
}
```

**Indexes**:
- `{ patientId: 1, scheduledTime: -1 }`
- `{ doctorId: 1, scheduledTime: -1 }`
- `{ status: 1 }`
- `{ scheduledTime: 1 }`
- `{ paymentStatus: 1 }`

---

## 🎥 SESSIONS Collection

**Collection Name**: `sessions`

**Purpose**: Store video/voice session metadata and recording information

**Schema**:
```javascript
{
  _id: ObjectId,
  
  // Session Details
  appointmentId: {
    type: ObjectId,
    ref: 'appointments',
    default: null,
    index: true
  },
  sessionType: {
    type: String,
    enum: ['appointment', 'follow-up', 'intake', 'emergency'],
    required: true
  },
  
  // Participants
  participants: [{
    userId: {
      type: ObjectId,
      ref: 'users',
      required: true
    },
    userType: {
      type: String,
      enum: ['patient', 'doctor'],
      required: true
    },
    name: String,
    avatar: String,
    joinedAt: Date,
    leftAt: Date,
    connectionQuality: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor'],
      default: null
    }
  }],
  
  // Timing
  startTime: {
    type: Date,
    required: true,
    index: true
  },
  endTime: {
    type: Date,
    default: null
  },
  duration: {
    type: Number,
    default: null
    // in seconds
  },
  
  // Status
  status: {
    type: String,
    enum: ['scheduled', 'active', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled',
    index: true
  },
  
  // Recording
  recording: {
    enabled: {
      type: Boolean,
      default: true
    },
    s3Url: String,
    fileSize: Number,
    duration: Number,
    format: {
      type: String,
      default: 'webm'
    },
    createdAt: Date,
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    }
  },
  
  // Emotion Data
  emotionData: [{
    timestamp: Date,
    emotion: String,
    confidence: Number,
    facialExpressions: {
      eyesOpen: Number,
      mouthOpen: Number,
      eyebrows: String
    },
    stressLevel: Number
  }],
  
  emotionSummary: {
    averageStressLevel: Number,
    dominantEmotion: String,
    emotionTimeline: [ObjectId] // References to emotion_data collection
  },
  
  // Connection Quality
  connectionQuality: {
    audioQuality: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor'],
      default: null
    },
    videoQuality: {
      type: String,
      enum: ['1080p', '720p', '480p', '360p', 'unknown'],
      default: null
    },
    bandwidth: Number,
    packetLoss: Number,
    latency: Number
  },
  
  // Technical Details
  webrtcConfig: {
    signalingServer: String,
    iceServers: [String],
    turnServer: String
  },
  
  // Post-Session
  doctorNotes: String,
  rating: {
    byPatient: {
      score: { type: Number, min: 1, max: 5 },
      feedback: String,
      submittedAt: Date
    },
    byDoctor: {
      score: { type: Number, min: 1, max: 5 },
      feedback: String,
      submittedAt: Date
    }
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
  }
}
```

**Indexes**:
- `{ appointmentId: 1 }`
- `{ startTime: -1 }`
- `{ status: 1 }`
- `{ "participants.userId": 1 }`

---

## 💬 CHAT_MESSAGES Collection

**Collection Name**: `chat_messages`

**Purpose**: Store AI triage chat and community messages

**Schema**:
```javascript
{
  _id: ObjectId,
  
  // Message Details
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file', 'link'],
    default: 'text'
  },
  
  // Sender
  senderId: {
    type: ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  senderType: {
    type: String,
    enum: ['user', 'ai_assistant', 'system'],
    required: true
  },
  
  // Channel
  channel: {
    type: String,
    enum: ['triage', 'community', 'private', 'support'],
    required: true,
    index: true
  },
  
  // For Triage
  triageSessionId: {
    type: ObjectId,
    default: null,
    index: true
  },
  
  // For Community
  communityPostId: {
    type: ObjectId,
    ref: 'community_posts',
    default: null,
    index: true
  },
  parentCommentId: {
    type: ObjectId,
    default: null
  },
  
  // For Private
  conversationId: {
    type: ObjectId,
    default: null,
    index: true
  },
  recipientId: {
    type: ObjectId,
    ref: 'users',
    default: null,
    index: true
  },
  
  // AI Analysis
  aiAnalysis: {
    sentiment: {
      emotion: String,
      polarity: Number,
      intensity: Number
    },
    riskLevel: {
      level: String,
      score: Number,
      confidence: Number,
      indicators: [String]
    },
    keywords: [String],
    intent: String,
    requiresEscalation: Boolean
  },
  
  // Moderation
  moderationStatus: {
    type: String,
    enum: ['clean', 'pending_review', 'flagged', 'blocked'],
    default: 'clean',
    index: true
  },
  moderationReason: String,
  moderatedBy: ObjectId,
  moderatedAt: Date,
  
  // Reactions
  reactions: [{
    emoji: String,
    userId: ObjectId,
    createdAt: Date
  }],
  
  // Edit History
  editHistory: [{
    editedAt: Date,
    previousContent: String,
    editedBy: ObjectId
  }],
  
  isEdited: {
    type: Boolean,
    default: false
  },
  
  // Deletion
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  deletedBy: ObjectId,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes**:
- `{ senderId: 1, createdAt: -1 }`
- `{ channel: 1, createdAt: -1 }`
- `{ triageSessionId: 1, createdAt: 1 }`
- `{ communityPostId: 1, createdAt: 1 }`
- `{ moderationStatus: 1 }`

---

## 🎙️ VOCAL_JOURNALS Collection

**Collection Name**: `vocal_journals`

**Purpose**: Store voice journal entries and audio analysis

**Schema**:
```javascript
{
  _id: ObjectId,
  
  // Recording
  userId: {
    type: ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  audioFormat: {
    type: String,
    enum: ['wav', 'mp3', 'webm', 'ogg'],
    default: 'wav'
  },
  audioSize: Number, // in bytes
  duration: {
    type: Number,
    required: true
    // in milliseconds
  },
  
  // Analysis Status
  analysisStatus: {
    type: String,
    enum: ['pending', 'processing', 'complete', 'failed'],
    default: 'pending',
    index: true
  },
  analysisStartedAt: Date,
  analysisCompletedAt: Date,
  
  // Vocal Biomarkers
  vocalBiomarkers: {
    fundamentalFrequency: {
      mean: Number,
      std: Number,
      min: Number,
      max: Number,
      interpretation: String
    },
    speechRate: {
      wordsPerMinute: Number,
      interpretation: String
    },
    voiceIntensity: {
      mean: Number,
      std: Number,
      interpretation: String
    },
    jitter: {
      value: Number,
      interpretation: String
    },
    shimmer: {
      value: Number,
      interpretation: String
    },
    pauseFrequency: {
      pauses: Number,
      avgPauseDuration: Number,
      interpretation: String
    }
  },
  
  // Emotion Detection
  emotionDetection: {
    primaryEmotion: String,
    confidence: Number,
    emotionScores: {
      happy: Number,
      sad: Number,
      anxious: Number,
      angry: Number,
      calm: Number
    }
  },
  
  // Mood Tags (Auto-Generated)
  moodTags: [{
    tag: String,
    confidence: Number,
    indicators: [String]
  }],
  
  // Transcription
  transcription: String,
  transcriptionLanguage: {
    type: String,
    default: 'en'
  },
  
  // Sentiment
  sentiment: {
    overall: String,
    polarity: Number,
    subjectivity: Number
  },
  
  // Themes & Keywords
  keyThemes: [String],
  
  // Risk Assessment
  riskIndicators: {
    present: Boolean,
    flags: [String],
    riskLevel: String
  },
  
  // Recommendations
  recommendations: [{
    type: String,
    suggestion: String,
    link: String
  }],
  
  // Timestamps
  recordedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes**:
- `{ userId: 1, recordedAt: -1 }`
- `{ analysisStatus: 1 }`
- `{ moodTags.tag: 1 }`

---

## 📱 COMMUNITY_POSTS Collection

**Collection Name**: `community_posts`

**Purpose**: Store community feed posts

**Schema**:
```javascript
{
  _id: ObjectId,
  
  // Author
  authorId: {
    type: ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  
  // Content
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  image: {
    url: String,
    s3Key: String,
    uploadedAt: Date
  },
  
  // Categorization
  category: {
    type: String,
    enum: ['mental_health', 'recovery', 'daily_life', 'resources', 'success_stories', 'question', 'support'],
    required: true,
    index: true
  },
  tags: [{
    type: String,
    maxlength: 50
  }],
  
  // Statistics
  stats: {
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    }
  },
  
  // Reactions
  reactions: [{
    type: String, // emoji or reaction type
    count: Number
  }],
  
  // Moderation
  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'blocked'],
    default: 'pending',
    index: true
  },
  moderationReason: String,
  contentAnalysis: {
    flagged: Boolean,
    reasons: [String],
    sentiment: String,
    confidence: Number
  },
  moderatedBy: ObjectId,
  moderatedAt: Date,
  
  // Deletion
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  deletedBy: ObjectId,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes**:
- `{ authorId: 1, createdAt: -1 }`
- `{ category: 1, createdAt: -1 }`
- `{ moderationStatus: 1 }`
- `{ "stats.likes": -1 }`

---

## 💬 POST_COMMENTS Collection

**Collection Name**: `post_comments`

**Purpose**: Store comments on community posts

**Schema**:
```javascript
{
  _id: ObjectId,
  
  postId: {
    type: ObjectId,
    ref: 'community_posts',
    required: true,
    index: true
  },
  
  parentCommentId: {
    type: ObjectId,
    ref: 'post_comments',
    default: null
  },
  
  authorId: {
    type: ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  
  isAnonymous: {
    type: Boolean,
    default: false
  },
  
  content: {
    type: String,
    required: true,
    maxlength: 1000
  },
  
  // Moderation
  moderationStatus: {
    type: String,
    enum: ['clean', 'pending', 'flagged', 'blocked'],
    default: 'clean'
  },
  
  // Statistics
  likes: {
    type: Number,
    default: 0
  },
  
  // Deletion
  isDeleted: {
    type: Boolean,
    default: false
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
  }
}
```

**Indexes**:
- `{ postId: 1, createdAt: 1 }`
- `{ authorId: 1 }`

---

## ❤️ POST_REACTIONS Collection

**Collection Name**: `post_reactions`

**Purpose**: Track emoji reactions to posts

**Schema**:
```javascript
{
  _id: ObjectId,
  
  postId: {
    type: ObjectId,
    ref: 'community_posts',
    required: true,
    index: true
  },
  
  userId: {
    type: ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  
  reaction: {
    type: String,
    enum: ['love', 'care', 'support', 'inspire', 'helpful', 'like'],
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes**:
- `{ postId: 1, userId: 1 }` (unique compound)
- `{ userId: 1 }`

---

## 🛡️ GUARDIAN_ACCESS Collection

**Collection Name**: `guardian_access`

**Purpose**: Manage guardian/caregiver access to patient data

**Schema**:
```javascript
{
  _id: ObjectId,
  
  // Relationship
  patientId: {
    type: ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  guardianId: {
    type: ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  relationship: {
    type: String,
    enum: ['parent', 'sibling', 'spouse', 'caregiver', 'legal_guardian', 'therapist'],
    required: true
  },
  
  // Permissions
  grantedPermissions: [{
    resource: {
      type: String,
      enum: ['mood_tracking', 'appointment_logs', 'chat_logs', 'journal_entries', 
             'prescriptions', 'medical_history', 'emergency_contacts'],
      required: true
    },
    allowed: {
      type: Boolean,
      default: true
    },
    grantedAt: Date,
    revokedAt: Date
  }],
  
  // Invitation
  invitationToken: {
    type: String,
    unique: true,
    sparse: true
  },
  invitationExpiresAt: Date,
  invitationEmail: String,
  
  // Access Status
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended', 'revoked'],
    default: 'pending',
    index: true
  },
  
  // Audit
  accessLog: [{
    accessedAt: Date,
    action: String,
    dataAccessed: String
  }],
  
  // Timestamps
  grantedAt: {
    type: Date,
    default: Date.now
  },
  revokedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes**:
- `{ patientId: 1, guardianId: 1 }` (unique compound)
- `{ status: 1 }`

---

## 🎵 RELAXATION_ACTIVITIES Collection

**Collection Name**: `relaxation_activities`

**Purpose**: Store relaxation exercises and guided activities

**Schema**:
```javascript
{
  _id: ObjectId,
  
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  
  category: {
    type: String,
    enum: ['breathing', 'meditation', 'music', 'muscle_relaxation', 'sleep', 'yoga', 'journaling'],
    required: true,
    index: true
  },
  
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  
  duration: {
    type: Number,
    required: true
    // in seconds
  },
  
  // Instructor
  instructor: {
    name: String,
    credentials: String,
    image: String
  },
  
  // Media
  audioUrl: String,
  videoUrl: String,
  imageUrl: String,
  
  // Metadata
  instructions: [String],
  benefits: [String],
  targetIssues: [String], // anxiety, stress, sleep, etc.
  
  // Rating
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  
  completions: {
    type: Number,
    default: 0
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes**:
- `{ category: 1 }`
- `{ "rating.average": -1 }`

---

## 😊 EMOTION_DATA Collection

**Collection Name**: `emotion_data`

**Purpose**: Store granular emotion detection data from video sessions

**Schema**:
```javascript
{
  _id: ObjectId,
  
  sessionId: {
    type: ObjectId,
    ref: 'sessions',
    required: true,
    index: true
  },
  
  userId: {
    type: ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  
  timestamp: {
    type: Date,
    required: true,
    index: true
  },
  
  // Emotion Detection
  emotionDetection: {
    happy: Number,
    sad: Number,
    angry: Number,
    fearful: Number,
    surprised: Number,
    disgusted: Number,
    neutral: Number
  },
  
  primaryEmotion: String,
  confidence: Number,
  
  // Facial Expressions
  facialExpressions: {
    eyesOpen: Number,
    mouthOpen: Number,
    eyebrows: String,
    mouthShape: String
  },
  
  // Stress Level
  stressLevel: Number, // 0-10 scale
  
  // Face Detection
  faceDetected: Boolean,
  facePosition: {
    x: Number,
    y: Number,
    width: Number,
    height: Number
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes**:
- `{ sessionId: 1, timestamp: 1 }`
- `{ userId: 1, timestamp: -1 }`

---

## 💊 PRESCRIPTIONS Collection

**Collection Name**: `prescriptions`

**Purpose**: Store medication prescriptions from doctors

**Schema**:
```javascript
{
  _id: ObjectId,
  
  doctorId: {
    type: ObjectId,
    ref: 'doctors',
    required: true,
    index: true
  },
  
  patientId: {
    type: ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  
  sessionId: {
    type: ObjectId,
    ref: 'sessions',
    required: true
  },
  
  medications: [{
    name: {
      type: String,
      required: true
    },
    dosage: {
      type: String,
      required: true
    },
    frequency: {
      type: String,
      required: true
      // e.g., "once daily", "twice daily"
    },
    duration: {
      value: Number,
      unit: {
        type: String,
        enum: ['days', 'weeks', 'months']
      }
    },
    instructions: String,
    sideEffects: [String],
    warnings: [String],
    refills: Number
  }],
  
  notes: String,
  
  // Status
  status: {
    type: String,
    enum: ['active', 'completed', 'stopped', 'revised'],
    default: 'active'
  },
  
  reviewDate: Date,
  
  // Timestamps
  issuedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  expiresAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes**:
- `{ patientId: 1, issuedAt: -1 }`
- `{ doctorId: 1 }`
- `{ status: 1 }`

---

## 🔔 NOTIFICATIONS Collection

**Collection Name**: `notifications`

**Purpose**: Store user notifications

**Schema**:
```javascript
{
  _id: ObjectId,
  
  userId: {
    type: ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  
  type: {
    type: String,
    enum: ['appointment_reminder', 'appointment_confirmed', 'new_comment', 
           'emergency', 'system', 'message', 'follow_up', 'milestone'],
    required: true,
    index: true
  },
  
  title: String,
  message: String,
  description: String,
  
  // Action URL
  actionUrl: String,
  actionData: Schema.Types.Mixed,
  
  // Status
  read: {
    type: Boolean,
    default: false,
    index: true
  },
  readAt: Date,
  
  // Delivery
  channels: {
    inApp: {
      type: Boolean,
      default: true
    },
    email: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: false
    }
  },
  
  deliveryStatus: {
    inApp: {
      type: String,
      enum: ['pending', 'delivered', 'failed'],
      default: 'pending'
    },
    email: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending'
    },
    sms: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending'
    }
  },
  
  // Priority
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  }
}
```

**Indexes**:
- `{ userId: 1, createdAt: -1 }`
- `{ read: 1 }`
- `{ type: 1 }`

---

## 📝 AUDIT_LOGS Collection

**Collection Name**: `audit_logs`

**Purpose**: Track all important system actions for compliance and security

**Schema**:
```javascript
{
  _id: ObjectId,
  
  // Actor
  userId: {
    type: ObjectId,
    ref: 'users',
    default: null
  },
  userRole: String,
  
  // Action
  action: {
    type: String,
    enum: ['user_login', 'user_logout', 'data_access', 'data_modification', 
           'guardian_access', 'crisis_protocol', 'content_moderation', 'admin_action'],
    required: true,
    index: true
  },
  
  // Subject
  resourceType: {
    type: String,
    required: true
  },
  resourceId: {
    type: ObjectId,
    required: true
  },
  
  // Changes
  changes: {
    before: Schema.Types.Mixed,
    after: Schema.Types.Mixed
  },
  
  // Details
  description: String,
  ipAddress: String,
  userAgent: String,
  
  // Status
  status: {
    type: String,
    enum: ['success', 'failure'],
    default: 'success'
  },
  errorMessage: String,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}
```

**Indexes**:
- `{ userId: 1, createdAt: -1 }`
- `{ action: 1, createdAt: -1 }`
- `{ resourceType: 1, resourceId: 1 }`

---

## 📊 Database Statistics

| Collection | Est. Documents | Purpose |
|-----------|--------|---------|
| users | ~5,000 | User accounts |
| doctors | ~200 | Doctor profiles |
| appointments | ~50,000 | Appointment bookings |
| sessions | ~10,000 | Video sessions |
| chat_messages | ~500,000 | Messages (triage + community) |
| vocal_journals | ~20,000 | Voice journals |
| community_posts | ~15,000 | Community feed |
| post_comments | ~80,000 | Post comments |
| post_reactions | ~100,000 | Post reactions |
| guardian_access | ~1,000 | Guardian records |
| relaxation_activities | ~50 | Activities |
| emotion_data | ~500,000 | Time series data |
| prescriptions | ~5,000 | Prescriptions |
| notifications | ~200,000 | Notifications |
| audit_logs | ~1,000,000 | Audit trail |

---

## 🔧 Connection String

**Development**:
```
mongodb://localhost:27017/mindsync
```

**Production** (Atlas):
```
mongodb+srv://username:password@cluster.mongodb.net/mindsync?retryWrites=true&w=majority
```

---

## 📈 Performance Optimization

### Key Indexes
- All foreign keys have indexes
- Timestamp queries optimized with date indexes
- Text search on `content` fields
- Compound indexes for common query patterns

### TTL (Time To Live) Indexes
- Email verification tokens: 24 hours
- Password reset tokens: 1 hour
- Session recordings: 90 days
- Notifications: 30 days

### Sharding Strategy (Future Scale)
- Shard key: `userId` for horizontal scaling
- Distributed across regions by geography

---

**Last Updated**: December 25, 2025
**Version**: 1.0.0 (Final Schema - Hackathon Round 1)
