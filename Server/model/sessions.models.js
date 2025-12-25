import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      index: true,
    },
    sessionType: {
      type: String,
      enum: ["appointment", "follow-up", "intake", "emergency"],
      required: true,
    },
    // Participants
    participants: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        userType: {
          type: String,
          enum: ["patient", "doctor"],
          required: true,
        },
        name: String,
        avatar: String,
        joinedAt: Date,
        leftAt: Date,
        connectionQuality: {
          type: String,
          enum: ["excellent", "good", "fair", "poor"],
          default: null,
        },
      },
    ],

    // Timing
    startTime: {
      type: Date,
      required: true,
      index: true,
    },
    endTime: {
      type: Date,
      default: null,
    },
    duration: {
      type: Number,
      default: null, // Total session duration in seconds
    },

    // Status
    status: {
      type: String,
      enum: ["scheduled", "active", "completed", "cancelled", "no-show"],
      default: "scheduled",
      index: true,
    },

    // Media Recording & Storage
    recording: {
      enabled: {
        type: Boolean,
        default: true,
      },
      s3Url: String,
      fileSize: Number,
      duration: Number, // Recording duration in seconds
      format: {
        type: String,
        default: "webm",
      },
      createdAt: Date,
      expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // Retention period: 90 days
      },
    },

    // Real-time Emotion Analysis
    emotionData: [
      {
        timestamp: Date,
        emotion: String,
        confidence: Number,
        facialExpressions: {
          eyesOpen: Number,
          mouthOpen: Number,
          eyebrows: String,
        },
        stressLevel: Number,
      },
    ],

    emotionSummary: {
      averageStressLevel: Number,
      dominantEmotion: String,
    // emotionTimeline: [ObjectId] // References to emotion_data collection
    },

    // Technical Performance
    connectionQuality: {
      audioQuality: {
        type: String,
        enum: ["excellent", "good", "fair", "poor"],
        default: null,
      },
      videoQuality: {
        type: String,
        enum: ["1080p", "720p", "480p", "360p", "unknown"],
        default: null,
      },
      bandwidth: Number,
      packetLoss: Number,
      latency: Number,
    },

    // WebRTC Infrastructure
    webrtcConfig: {
      signalingServer: String,
      iceServers: [String],
      turnServer: String,
    },

    // Post-Session Feedback & Notes
    doctorNotes: String,
    rating: {
      byPatient: {
        score: { type: Number, min: 1, max: 5 },
        feedback: String,
        submittedAt: Date,
      },
      byDoctor: {
        score: { type: Number, min: 1, max: 5 },
        feedback: String,
        submittedAt: Date,
      },
    },
  },
  { timestamps: true }
);

export const Session = mongoose.model("Session", sessionSchema);
