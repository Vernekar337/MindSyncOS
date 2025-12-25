import mongoose from "mongoose";

const relaxationActivitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    category: {
      type: String,
      enum: [
        "breathing",
        "meditation",
        "music",
        "muscle_relaxation",
        "sleep",
        "yoga",
        "journaling",
      ],
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    duration: {
      type: Number,
      required: true, // Duration in seconds
    },

    // Media Assets
    audioUrl: String,
    videoUrl: String,
    imageUrl: String,

    // Content Metadata
    instructions: [String],
    benefits: [String],
    targetIssues: [String], // e.g., ["anxiety", "stress", "sleep"]

    // Engagement Metrics
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    completions: {
      type: Number,
      default: 0,
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Indexes
relaxationActivitySchema.index({ category: 1 });
relaxationActivitySchema.index({ "rating.average": -1 });

export const RelaxationActivity = mongoose.model(
  "RelaxationActivity",
  relaxationActivitySchema
);
