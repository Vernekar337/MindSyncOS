import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    liscenseNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    liscenseVerificationDate: {
      type: Date,
      default: null,
    },
    medicalRegistrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    yearsOfExperience: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
      required: true,
    },
    specializations: [
      {
        type: String,
        enum: [
          "depression",
          "anxiety",
          "adhd",
          "ptsd",
          "ocd",
          "eating_disorders",
          "addiction",
          "relationship",
          "stress_management",
          "bipolar",
          "schizophrenia",
          "trauma",
          "grief_loss",
          "adolescent",
          "child",
        ],
        required: true,
        index: true,
      },
    ],
    qualifications: [
      {
        degree: {
          type: String,
          required: true,
          // e.g., "M.D. Psychiatry", "M.Sc. Clinical Psychology"
        },
        institution: {
          type: String,
          required: true, // University or Institution name
        },
        yearObtained: {
          type: Number,
          required: true, // Year of graduation/certification
        },
      },
    ],

    // Certifications
    certifications: [
      {
        name: {
          type: String,
          required: true,
          // e.g., "CBT Certified", "Trauma-Informed Therapy"
        },
        issuingBody: {
          type: String,
          required: true, // Organization that issued the certificate
        },
        certificationNumber: {
          type: String,
          required: true, // Unique ID for verification
        },
        issueDate: {
          type: Date,
          required: true,
        },
        expiryDate: {
          type: Date,
          default: null, // Null if the certification does not expire
        },
      },
    ],

    // Practice Information
    languages: [
      {
        type: String,
        enum: [
          "English",
          "Hindi",
          "Marathi",
          "Tamil",
          "Telugu",
          "Kannada",
          "Malayalam",
        ],
        required: true,
      },
    ],

    consultationFee: {
      type: Number,
      required: true,
      min: 100, // Minimum fee in specified currency
    },
    currency: {
      type: String,
      default: "INR",
    },

    sessionDuration: {
      type: Number,
      default: 45,
      // Default duration per session in minutes
    },
    availability: {
      // Working days (0-6, where 0=Sunday)
      workingDays: [Number],

      // Time slots for regular sessions
      slots: [
        {
          dayOfWeek: { type: Number, min: 0, max: 6 },
          startTime: String, // HH:mm format (24-hour)
          endTime: String, // HH:mm format (24-hour)
        },
      ],

      // Blackout dates (non-working periods like holidays or leaves)
      blackoutDates: [
        {
          startDate: Date,
          endDate: Date,
          reason: String,
        },
      ],

      // Cached or calculated next available appointment slot
      nextAvailableSlot: Date,

      // Maximum number of sessions the doctor accepts in a single day
      maxDailySessions: {
        type: Number,
        default: 8,
      },
    },

    // Ratings & Reviews summary
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0, // Total number of reviews received
      },
      distribution: {
        five: { type: Number, default: 0 },
        four: { type: Number, default: 0 },
        three: { type: Number, default: 0 },
        two: { type: Number, default: 0 },
        one: { type: Number, default: 0 },
      },
    },

    // Aggregated performance statistics
    statistics: {
      totalPatients: {
        type: Number,
        default: 0, // Total unique patients seen
      },
      totalSessions: {
        type: Number,
        default: 0, // Total bookings (including upcoming/cancelled)
      },
      completedSessions: {
        type: Number,
        default: 0, // Successfully finished sessions
      },
      averageSessionRating: {
        type: Number,
        default: 0,
      },
      cancellationRate: {
        type: Number,
        default: 0, // Percentage of sessions cancelled by the doctor
      },
    },

    // Admin Verification Process
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
      index: true,
    },
    verificationNotes: String, // Internal notes from the admin during verification
  },
  { timestamps: true }
);


export const Doctor = mongoose.model("Doctor", doctorSchema);