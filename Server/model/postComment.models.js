import mongoose from "mongoose";

const postCommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommunityPost",
      required: true,
      index: true,
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostComment",
      default: null,
    },
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
    content: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    // Moderation
    moderationStatus: {
      type: String,
      enum: ["clean", "pending", "flagged", "blocked"],
      default: "clean",
    },
    // Statistics
    likes: {
      type: Number,
      default: 0,
    },
    // Deletion
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes
postCommentSchema.index({ postId: 1, createdAt: 1 });
postCommentSchema.index({ authorId: 1 });

export const PostComment = mongoose.model("PostComment", postCommentSchema);
