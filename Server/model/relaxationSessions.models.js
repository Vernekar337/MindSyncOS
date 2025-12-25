import mongoose from "mongoose";

const relaxationSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RelaxationActivity",
      required: true,
      index: true,
    },
    startTime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    endTime: {
      type: Date,
    },
    actualDuration: {
      type: Number, // in seconds
    },
    status: {
      type: String,
      enum: ["active", "completed", "abandoned"],
      default: "active",
      index: true,
    },
    // Progress Tracking
    moodBefore: {
      type: String,
    },
    moodAfter: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    feedback: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

// Indexes for history retrieval
relaxationSessionSchema.index({ userId: 1, startTime: -1 });

export const RelaxationSession = mongoose.model(
  "RelaxationSession",
  relaxationSessionSchema
);
