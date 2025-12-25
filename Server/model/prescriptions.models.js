import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Points to the professional profile
      required: true,
      index: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    // Prescribed Medications
    medications: [
      {
        name: {
          type: String,
          required: true,
        },
        dosage: {
          type: String,
          required: true, // e.g., "50mg"
        },
        frequency: {
          type: String,
          required: true, // e.g., "once daily", "twice daily"
        },
        duration: {
          value: Number,
          unit: {
            type: String,
            enum: ["days", "weeks", "months"],
          },
        },
        instructions: String, // e.g., "Take after food"
        sideEffects: [String],
        warnings: [String],
        refills: {
          type: Number,
          default: 0,
        },
      },
    ],

    notes: String,

    // Clinical Status
    status: {
      type: String,
      enum: ["active", "completed", "stopped", "revised"],
      default: "active",
      index: true,
    },

    // Lifecycle Dates
    issuedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    reviewDate: Date,
    expiresAt: Date,
  },
  { timestamps: true }
);

// Clinical Retrieval Indexes
prescriptionSchema.index({ patientId: 1, issuedAt: -1 });
prescriptionSchema.index({ doctorId: 1 });

export const Prescription = mongoose.model("Prescription", prescriptionSchema);
