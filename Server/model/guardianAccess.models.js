import mongoose from "mongoose";

const guardianAccessSchema = new mongoose.Schema(
  {
    // Relationship
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    guardianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    relationship: {
      type: String,
      enum: [
        "parent",
        "sibling",
        "spouse",
        "caregiver",
        "legal_guardian",
        "therapist",
      ],
      required: true,
    },

    // Permissions
    grantedPermissions: [
      {
        resource: {
          type: String,
          enum: [
            "mood_tracking",
            "appointment_logs",
            "chat_logs",
            "journal_entries",
            "prescriptions",
            "medical_history",
            "emergency_contacts",
          ],
          required: true,
        },
        allowed: {
          type: Boolean,
          default: true,
        },
        grantedAt: Date,
        revokedAt: Date,
      },
    ],

    // Invitation
    invitationToken: {
      type: String,
      unique: true,
      sparse: true,
    },
    invitationExpiresAt: Date,
    invitationEmail: String,

    // Access Status
    status: {
      type: String,
      enum: ["pending", "active", "suspended", "revoked"],
      default: "pending",
      index: true,
    },

    // Audit
    accessLog: [
      {
        accessedAt: Date,
        action: String,
        dataAccessed: String,
      },
    ],

    // Timestamps
    grantedAt: {
      type: Date,
      default: Date.now,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Indexes
guardianAccessSchema.index({ patientId: 1, guardianId: 1 }, { unique: true });
guardianAccessSchema.index({ status: 1 });

export const GuardianAccess = mongoose.model(
  "GuardianAccess",
  guardianAccessSchema
);
