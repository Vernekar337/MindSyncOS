import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema(
  {
    // Author
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },

    // Content
    content: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    image: {
      url: String,
      s3Key: String,
      uploadedAt: Date,
    },

    // Categorization
    category: {
      type: String,
      enum: [
        "mental_health",
        "recovery",
        "daily_life",
        "resources",
        "success_stories",
        "question",
        "support",
      ],
      required: true,
      index: true,
    },
    tags: [
      {
        type: String,
        maxlength: 50,
      },
    ],

    // Statistics
    stats: {
      likes: {
        type: Number,
        default: 0,
      },
      comments: {
        type: Number,
        default: 0,
      },
      shares: {
        type: Number,
        default: 0,
      },
      views: {
        type: Number,
        default: 0,
      },
    },

    // Reactions
    reactions: [
      {
        type: String, // Emoji or reaction type
        count: {
          type: Number,
          default: 0,
        },
      },
    ],

    // Moderation
    moderationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected", "blocked"],
      default: "pending",
      index: true,
    },
    moderationReason: String,
    contentAnalysis: {
      flagged: {
        type: Boolean,
        default: false,
      },
      reasons: [String],
      sentiment: String,
      confidence: Number,
    },
    moderatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    moderatedAt: Date,

    // Deletion
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Indexes
communityPostSchema.index({ authorId: 1, createdAt: -1 });
communityPostSchema.index({ category: 1, createdAt: -1 });
communityPostSchema.index({ moderationStatus: 1 });
communityPostSchema.index({ "stats.likes": -1 });

export const CommunityPost = mongoose.model(
  "CommunityPost",
  communityPostSchema
);
