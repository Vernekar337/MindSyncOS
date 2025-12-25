import mongoose from "mongoose";

const emotionDataSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    timestamp: {
      type: Date,
      required: true,
      index: true,
    },

    // Real-time AI Emotion Detection
    emotionDetection: {
      happy: Number,
      sad: Number,
      angry: Number,
      fearful: Number,
      surprised: Number,
      disgusted: Number,
      neutral: Number,
    },
    primaryEmotion: String,
    confidence: Number, // 0 to 1

    // Facial Landmark Analysis
    facialExpressions: {
      eyesOpen: Number,
      mouthOpen: Number,
      eyebrows: String, // e.g., "raised", "normal", "frowned"
      mouthShape: String,
    },

    // Physiological Proxy
    stressLevel: {
      type: Number,
      min: 0,
      max: 10,
    },

    // Face Detection Metadata
    faceDetected: {
      type: Boolean,
      default: false,
    },
    facePosition: {
      x: Number,
      y: Number,
      width: Number,
      height: Number,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Performance Indexes for Session Playback and User Trends
emotionDataSchema.index({ sessionId: 1, timestamp: 1 });
emotionDataSchema.index({ userId: 1, timestamp: -1 });

export const EmotionData = mongoose.model("EmotionData", emotionDataSchema);
