import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    scheduleTime: {
      type: Date,
      required: true,
      index: true, // Start time of the appointment
    },
    endTime: {
      type: Date,
      required: true,
      index: true, // Expected end time of the appointment
    },
    duration: {
      type: Number,
      default: 45, // Duration in minutes
    },
    reason: {
      type: String,
      required: true,
      maxLength: 500,
    },
    mode: {
      type: String,
      enum: ["video", "audio", "in-person"],
    },
    location: {
      type: String,
      required: true,
      default: "video", // Link for video/audio or physical address
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "in-progress",
        "completed",
        "cancelled",
        "no-show",
        "rescheduled",
      ],
      default: "pending",
      index: true,
    },
    previousTreatment: String,
    medicationsCurrently: String,
    patientNotes: String,
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      default: null,
    },
    doctorNotes: {
      type: String,
      default: null,
    },
    prescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
      default: null,
    },
    fee: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
      index: true,
    },
    paymentDate: Date,
    transactionId: String,
    // Rescheduling Logic
    originalAppointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },
    rescheduleCount: {
      type: Number,
      default: 0,
    },
    lastRescheduledAt: Date,

    // Cancellation & Refunds
    cancelledAt: Date,
    cancellationReason: String,
    cancelledBy: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: null,
    },
    refundStatus: {
      type: String,
      enum: ["pending", "processed", "failed"],
      default: null,
    },
    refundAmount: {
      type: Number,
      default: null,
    },

    // Automated Reminders Status
    reminders: {
      email24hSent: {
        type: Boolean,
        default: false,
      },
      email1hSent: {
        type: Boolean,
        default: false,
      },
      smsSent: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

// Indexes
appointmentSchema.index({ patientId: 1, scheduleTime: -1 });
appointmentSchema.index({ doctorId: 1, scheduleTime: -1 });

export const Appointment = mongoose.model("Appointment", appointmentSchema);
