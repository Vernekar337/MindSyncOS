import mongoose from "mongoose";

const postReactionSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommunityPost",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    reaction: {
      type: String,
      enum: ["love", "care", "support", "inspire", "helpful", "like"],
      required: true,
    },
  },
  { timestamps: true } // Requested createdAt is handled by timestamps
);

// Indexes
postReactionSchema.index({ postId: 1, userId: 1 }, { unique: true });
postReactionSchema.index({ userId: 1 });

export const PostReaction = mongoose.model("PostReaction", postReactionSchema);
