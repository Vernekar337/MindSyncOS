import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxLength: 5000,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file", "link"],
      default: "text",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    senderType: {
      type: String,
      enum: ["user", "ai_assistant", "system"],
      required: true,
    },
    // Channel
    channel: {
      type: String,
      enum: ["triage", "community", "private", "support"],
      required: true,
      index: true,
    },

    // For Triage
    triageSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TriageSession",
      default: null,
      index: true,
    },
    // For Community
    communityPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommunityPost",
      default: null,
      index: true,
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId, // If this is a reply to another message/comment
      default: null,
    },

    // For Private Conversations
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
          ref: "Conversation",
      default: null,
      index: true,
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    // AI-Driven Sentiment and Risk Analysis
    aiAnalysis: {
      sentiment: {
        emotion: String,
        polarity: Number, // -1 (negative) to 1 (positive)
        intensity: Number,
      },
      riskLevel: {
        level: {
          type: String,
          enum: ["none", "low", "medium", "high", "crisis"],
        },
        score: Number,
        confidence: Number,
        indicators: [String], // e.g., ["self-harm", "anxiety", "aggression"]
      },
      keywords: [String],
      intent: String,
      requiresEscalation: { type: Boolean, default: false },
    },

    // Content Moderation
    moderationStatus: {
      type: String,
      enum: ["clean", "pending_review", "flagged", "blocked"],
      default: "clean",
      index: true,
    },
    moderationReason: String,
    moderatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    moderatedAt: Date,

    // Social Reactions
    reactions: [
      {
        emoji: String,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // Versioning & Deletion
    editHistory: [
      {
        editedAt: { type: Date, default: Date.now },
        previousContent: String,
        editedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    isEdited: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
