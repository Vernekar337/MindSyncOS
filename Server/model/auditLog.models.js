import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    // Actor
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    userRole: {
      type: String,
    },

    // Action
    action: {
      type: String,
      enum: [
        "user_login",
        "user_logout",
        "data_access",
        "data_modification",
        "guardian_access",
        "crisis_protocol",
        "content_moderation",
        "admin_action",
      ],
      required: true,
      index: true,
    },

    // Subject
    resourceType: {
      type: String,
      required: true,
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // Changes
    changes: {
      before: {
        type: mongoose.Schema.Types.Mixed,
      },
      after: {
        type: mongoose.Schema.Types.Mixed,
      },
    },

    // Details
    description: String,
    ipAddress: String,
    userAgent: String,

    // Status
    status: {
      type: String,
      enum: ["success", "failure"],
      default: "success",
    },
    errorMessage: String,

    // Temporal Metadata
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Audit Indexes
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });
auditLogSchema.index({ resourceType: 1, resourceId: 1 });

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
