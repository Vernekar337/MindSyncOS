import mongoose from "mongoose";

const vocalJournalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    audioFormat: {
      type: String,
      enum: ["wav", "mp3", "webm", "ogg"],
      default: "wav",
    },
    audioSize: Number, // In bytes
    duration: {
      type: Number,
      required: true, // Duration in milliseconds
    },

    // Processing & Analysis Lifecycle
    analysisStatus: {
      type: String,
      enum: ["pending", "processing", "complete", "failed"],
      default: "pending",
      index: true,
    },
    analysisStartedAt: Date,
    analysisCompletedAt: Date,

    // Clinical Vocal Biomarkers (AI-extracted)
    vocalBiomarkers: {
      fundamentalFrequency: {
        mean: Number,
        std: Number,
        min: Number,
        max: Number,
        interpretation: String, // e.g., "Flat affect detected"
      },
      speechRate: {
        wordsPerMinute: Number,
        interpretation: String, // e.g., "Rapid speech (pressured)"
      },
      voiceIntensity: {
        mean: Number,
        std: Number,
        interpretation: String,
      },
      jitter: {
        value: Number,
        interpretation: String, // Frequency instability
      },
      shimmer: {
        value: Number,
        interpretation: String, // Amplitude instability
      },
      pauseFrequency: {
        pauses: Number,
        avgPauseDuration: Number,
        interpretation: String,
      },
    },

    // Probabilistic Emotion Detection
    emotionDetection: {
      primaryEmotion: String,
      confidence: Number, // 0 to 1
      emotionScores: {
        happy: Number,
        sad: Number,
        anxious: Number,
        angry: Number,
        calm: Number,
      },
    },

    // Automated Mood Tags
    moodTags: [
      {
        tag: String,
        confidence: Number,
        indicators: [String],
      },
    ],

    // Content Transcription
    transcription: String,
    transcriptionLanguage: {
      type: String,
      default: "en",
    },

    // NLP Sentiment Analysis
    sentiment: {
      overall: { type: String, enum: ["positive", "neutral", "negative"] },
      polarity: Number, // -1 to 1
      subjectivity: Number, // 0 to 1
    },

    // AI-extracted Themes & Keywords
    keyThemes: [String],

    // Clinical Risk Assessment
    riskIndicators: {
      present: { type: Boolean, default: false },
      flags: [String], // e.g., ["self-harm", "hopelessness"]
      riskLevel: {
        type: String,
        enum: ["none", "low", "medium", "high", "crisis"],
        default: "none",
      },
    },

    // Actionable Recommendations
    recommendations: [
      {
        type: String,
        suggestion: String,
        link: String,
      },
    ],

    // User-facing timestamp
    recordedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

export const VocalJournal = mongoose.model("VocalJournal", vocalJournalSchema);
