import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "appointment_reminder",
        "appointment_confirmed",
        "new_comment",
        "emergency",
        "system",
        "message",
        "follow_up",
        "milestone",
      ],
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: String,
    description: String,

    // Payload for Frontend Actions
    actionUrl: String,
    actionData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Visual & Functional State
    read: {
      type: Boolean,
      default: false,
      index: true,
    },
    readAt: Date,

    // Multi-channel Delivery Configuration
    channels: {
      inApp: {
        type: Boolean,
        default: true,
      },
      email: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
    },

    // Real-time Delivery Status Tracking
    deliveryStatus: {
      inApp: {
        type: String,
        enum: ["pending", "delivered", "failed"],
        default: "pending",
      },
      email: {
        type: String,
        enum: ["pending", "sent", "failed"],
        default: "pending",
      },
      sms: {
        type: String,
        enum: ["pending", "sent", "failed"],
        default: "pending",
      },
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    // Retention and Auto-expire
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

// Performance Indexes for Notification Feed
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ read: 1 });
notificationSchema.index({ type: 1 });

export const Notification = mongoose.model("Notification", notificationSchema);
