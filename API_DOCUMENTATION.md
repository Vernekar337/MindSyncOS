# 🔌 MindSync OS - Complete API Documentation

## Overview

This document contains all APIs required for MindSync OS with detailed specifications, request/response formats, authentication, error handling, and real-time WebSocket events.

**Base URL**: `http://localhost:5000/api` (development)
**Authentication**: JWT Bearer Token in Authorization header
**Content-Type**: `application/json`

---

## 📋 API Index

1. [Authentication APIs](#authentication-apis) (8 endpoints)
2. [AI Triage APIs](#ai-triage-apis) (4 endpoints)
3. [Appointment/Booking APIs](#appointmentbooking-apis) (7 endpoints)
4. [Video Session APIs](#video-session-apis) (6 endpoints)
5. [Community APIs](#community-apis) (6 endpoints)
6. [Vocal Journal APIs](#vocal-journal-apis) (5 endpoints)
7. [Guardian/Caregiver APIs](#guardiancellar-apis) (5 endpoints)
8. [Dashboard/Analytics APIs](#dashboardanalytics-apis) (4 endpoints)
9. [Relaxation Hub APIs](#relaxation-hub-apis) (3 endpoints)
10. [WebSocket Events](#websocket-events)

---

# ✅ AUTHENTICATION APIS

## 1. User Registration

**Endpoint**: `POST /auth/register`

**Public Access**: Yes (No authentication required)

**Description**: Create a new user account with email verification

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1995-05-15",
  "role": "patient",
  "phone": "+91-9876543210"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "User registered successfully. Verification email sent.",
  "user": {
    "id": "user_123abc",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "patient",
    "emailVerified": false,
    "createdAt": "2025-12-25T08:52:00Z"
  },
  "verificationEmailSent": true
}
```

**Error Responses**:
- `400 Bad Request` - Invalid email format or password too weak
- `409 Conflict` - Email already registered
- `422 Unprocessable Entity` - Missing required fields

**Validation Rules**:
- Email: Valid email format, unique in database
- Password: Min 8 chars, 1 uppercase, 1 number, 1 special char
- firstName/lastName: 2-50 characters
- role: enum [patient, doctor, admin, guardian]

---

## 2. User Login

**Endpoint**: `POST /auth/login`

**Public Access**: Yes

**Description**: Authenticate user and return JWT tokens

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_123abc",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "patient",
    "avatar": "https://cdn.example.com/avatars/user_123abc.jpg"
  },
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

**Error Responses**:
- `401 Unauthorized` - Invalid email or password
- `403 Forbidden` - Email not verified
- `429 Too Many Requests` - Too many failed login attempts (lock account for 30 mins)

**Security Notes**:
- Access token valid for 24 hours
- Refresh token valid for 7 days
- Rate limit: 5 failed attempts then 30-min lockout

---

## 3. Refresh Access Token

**Endpoint**: `POST /auth/refresh-token`

**Authentication**: Required (Refresh Token)

**Description**: Get new access token using refresh token

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400
}
```

**Error Responses**:
- `401 Unauthorized` - Invalid or expired refresh token
- `400 Bad Request` - Refresh token not provided

---

## 4. Email Verification

**Endpoint**: `POST /auth/verify-email`

**Public Access**: Yes

**Description**: Verify email using token sent in registration email

**Request Body**:
```json
{
  "verificationToken": "abc123xyz456"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

**Error Responses**:
- `400 Bad Request` - Invalid or expired verification token

---

## 5. Logout

**Endpoint**: `POST /auth/logout`

**Authentication**: Required

**Description**: Invalidate user's tokens

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 6. Request Password Reset

**Endpoint**: `POST /auth/request-password-reset`

**Public Access**: Yes

**Description**: Send password reset email

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Password reset email sent if account exists"
}
```

**Security**: Always returns 200 to prevent email enumeration attacks

---

## 7. Reset Password

**Endpoint**: `POST /auth/reset-password`

**Public Access**: Yes

**Description**: Reset password using token from email

**Request Body**:
```json
{
  "resetToken": "abc123xyz456",
  "newPassword": "NewSecurePass123!"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Error Responses**:
- `400 Bad Request` - Invalid or expired reset token
- `422 Unprocessable Entity` - Password doesn't meet requirements

---

## 8. Get Current User Profile

**Endpoint**: `GET /auth/me`

**Authentication**: Required

**Description**: Get authenticated user's profile information

**Response** (200 OK):
```json
{
  "success": true,
  "user": {
    "id": "user_123abc",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1995-05-15",
    "phone": "+91-9876543210",
    "role": "patient",
    "avatar": "https://cdn.example.com/avatars/user_123abc.jpg",
    "bio": "Mental health advocate",
    "preferredLanguage": "en",
    "emailVerified": true,
    "createdAt": "2025-12-25T08:52:00Z",
    "lastLogin": "2025-12-25T10:30:00Z"
  }
}
```

---

# 🤖 AI TRIAGE APIS

## 1. Send Message to AI Chatbot

**Endpoint**: `POST /triage/chat`

**Authentication**: Required

**Description**: Send message to AI triage chatbot and get response with risk assessment

**Request Body**:
```json
{
  "message": "I've been feeling really sad for the past week and I can't get out of bed",
  "sessionId": "session_123abc"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "I'm sorry to hear that you're struggling...",
  "riskAssessment": {
    "level": "medium",
    "score": 6.5,
    "confidence": 0.92,
    "indicators": ["persistent_sadness", "anhedonia", "low_energy"],
    "recommendation": "suggest_booking"
  },
  "sentiment": {
    "emotion": "sad",
    "intensity": 0.85,
    "polarity": -0.8
  },
  "chatHistory": {
    "id": "chat_123abc",
    "userMessages": 5,
    "assistantMessages": 5,
    "startedAt": "2025-12-25T08:52:00Z"
  },
  "suggestedNextStep": {
    "type": "booking",
    "specialty": "depression",
    "urgency": "within_7_days"
  }
}
```

**Risk Levels**:
- `low` (score 0-3): Route to relaxation hub
- `medium` (score 3-7): Suggest booking doctor
- `high` (score 7-10): Trigger crisis protocol

**Response Headers**:
- `X-Risk-Level`: low|medium|high
- `X-Requires-Escalation`: true|false

**Error Responses**:
- `401 Unauthorized` - Invalid token
- `429 Too Many Requests` - Rate limited (max 50 messages/hour)
- `500 Internal Server Error` - AI service unavailable

---

## 2. Get Chat History

**Endpoint**: `GET /triage/chat-history?limit=50&offset=0`

**Authentication**: Required

**Description**: Retrieve all previous triage chat conversations

**Query Parameters**:
- `limit` (optional): Number of messages (default: 50, max: 200)
- `offset` (optional): Pagination offset (default: 0)
- `startDate` (optional): Filter from date (ISO 8601)
- `endDate` (optional): Filter to date (ISO 8601)

**Response** (200 OK):
```json
{
  "success": true,
  "messages": [
    {
      "id": "msg_123abc",
      "type": "user",
      "content": "I'm feeling anxious",
      "timestamp": "2025-12-25T08:52:00Z",
      "emotion": "anxious",
      "sentiment": -0.6
    },
    {
      "id": "msg_123def",
      "type": "assistant",
      "content": "I understand...",
      "timestamp": "2025-12-25T08:53:00Z",
      "riskAssessment": {
        "level": "low",
        "score": 2.1
      }
    }
  ],
  "pagination": {
    "total": 234,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## 3. Get Current Risk Level

**Endpoint**: `GET /triage/risk-level`

**Authentication**: Required

**Description**: Get current user's risk assessment without sending a message

**Response** (200 OK):
```json
{
  "success": true,
  "currentRiskLevel": {
    "level": "medium",
    "score": 5.2,
    "confidence": 0.87,
    "timestamp": "2025-12-25T09:30:00Z",
    "lastAssessmentAt": "2025-12-25T09:30:00Z",
    "trend": "increasing"
  },
  "riskTrend": {
    "pastHour": "stable",
    "pastDay": "increasing",
    "pastWeek": "decreasing"
  },
  "recommendations": [
    {
      "type": "booking",
      "specialty": "anxiety_disorders",
      "urgency": "within_3_days"
    },
    {
      "type": "relaxation",
      "activity": "guided_breathing"
    }
  ],
  "crisisIndicators": false
}
```

---

## 4. End Triage Session

**Endpoint**: `POST /triage/session/end`

**Authentication**: Required

**Description**: Formally end a triage session and save summary

**Request Body**:
```json
{
  "sessionId": "session_123abc",
  "feedback": "helpful",
  "notes": "Want to book an appointment with anxiety specialist"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "sessionSummary": {
    "id": "session_123abc",
    "duration": 1200,
    "messageCount": 8,
    "finalRiskLevel": "medium",
    "mainTopics": ["anxiety", "work_stress"],
    "recommendations": ["book_doctor", "relaxation_exercises"],
    "savedAt": "2025-12-25T09:45:00Z"
  }
}
```

---

# 📅 APPOINTMENT/BOOKING APIS

## 1. Get All Doctors

**Endpoint**: `GET /appointments/doctors?specialty=depression&available=true&limit=20&offset=0`

**Authentication**: Required

**Description**: List all doctors with filtering and pagination

**Query Parameters**:
- `specialty` (optional): Filter by specialization
- `available` (optional): boolean - only available doctors
- `rating` (optional): Min rating (0-5)
- `limit` (optional): Results per page (default: 20, max: 100)
- `offset` (optional): Pagination offset
- `search` (optional): Search by name

**Specialties**:
- depression, anxiety, adhd, ptsd, ocd, eating_disorders, addiction, relationship, stress_management, bipolar, schizophrenia

**Response** (200 OK):
```json
{
  "success": true,
  "doctors": [
    {
      "id": "doc_456def",
      "firstName": "Dr.",
      "lastName": "Smith",
      "specialization": ["depression", "anxiety"],
      "licenseNumber": "LIC123456",
      "bio": "15 years experience in clinical psychology",
      "avatar": "https://cdn.example.com/avatars/doc_456def.jpg",
      "rating": 4.8,
      "reviewCount": 127,
      "consultationFee": 500,
      "currency": "INR",
      "availability": {
        "nextAvailableSlot": "2025-12-26T10:00:00Z",
        "totalSlotsAvailable": 12
      },
      "languages": ["English", "Hindi"],
      "yearsExperience": 15
    }
  ],
  "pagination": {
    "total": 145,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## 2. Get Doctor Details & Available Slots

**Endpoint**: `GET /appointments/doctors/:doctorId/slots?date=2025-12-26&timezone=Asia/Kolkata`

**Authentication**: Required

**Description**: Get detailed doctor profile and available appointment slots

**URL Parameters**:
- `doctorId` (required): Doctor's unique ID

**Query Parameters**:
- `date` (optional): Specific date (YYYY-MM-DD). If not provided, returns next 7 days
- `timezone` (optional): User's timezone for slot display (default: UTC)

**Response** (200 OK):
```json
{
  "success": true,
  "doctor": {
    "id": "doc_456def",
    "firstName": "Dr.",
    "lastName": "Smith",
    "specialization": ["depression", "anxiety"],
    "bio": "15 years experience",
    "avatar": "https://cdn.example.com/avatars/doc_456def.jpg",
    "rating": 4.8,
    "languages": ["English", "Hindi"],
    "consultationFee": 500,
    "sessionDuration": 45,
    "qualifications": [
      "M.D. Psychiatry",
      "Fellowship in Clinical Psychology"
    ],
    "certifications": [
      "CBT Certified",
      "Trauma-Informed Therapy"
    ]
  },
  "availableSlots": [
    {
      "slotId": "slot_789ghi",
      "startTime": "2025-12-26T10:00:00Z",
      "endTime": "2025-12-26T10:45:00Z",
      "dayOfWeek": "Friday",
      "status": "available"
    },
    {
      "slotId": "slot_789ghj",
      "startTime": "2025-12-26T11:00:00Z",
      "endTime": "2025-12-26T11:45:00Z",
      "dayOfWeek": "Friday",
      "status": "available"
    },
    {
      "slotId": "slot_789ghk",
      "startTime": "2025-12-26T14:30:00Z",
      "endTime": "2025-12-26T15:15:00Z",
      "dayOfWeek": "Friday",
      "status": "booked"
    }
  ],
  "pagination": {
    "totalSlots": 18,
    "availableSlots": 16,
    "bookedSlots": 2
  }
}
```

---

## 3. Book Appointment

**Endpoint**: `POST /appointments/book`

**Authentication**: Required

**Description**: Create a new appointment booking

**Request Body**:
```json
{
  "doctorId": "doc_456def",
  "slotId": "slot_789ghi",
  "reason": "I've been experiencing depression symptoms for 3 weeks",
  "previousTreatment": "Never been to therapy before",
  "medicationsCurrently": "None",
  "notes": "I prefer evening sessions",
  "preferredMode": "video"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "appointment": {
    "id": "apt_101jkl",
    "patientId": "user_123abc",
    "doctorId": "doc_456def",
    "doctorName": "Dr. Smith",
    "scheduledTime": "2025-12-26T10:00:00Z",
    "endTime": "2025-12-26T10:45:00Z",
    "duration": 45,
    "reason": "Depression screening",
    "mode": "video",
    "status": "confirmed",
    "fee": 500,
    "paymentStatus": "pending",
    "joinUrl": "https://mindsync.local/sessions/apt_101jkl/join",
    "confirmationCode": "MS2025001",
    "createdAt": "2025-12-25T09:50:00Z",
    "reminderScheduled": true
  },
  "confirmationEmail": {
    "sent": true,
    "to": "user@example.com"
  }
}
```

**Error Responses**:
- `400 Bad Request` - Slot already booked or invalid doctorId
- `402 Payment Required` - Payment needed before booking
- `409 Conflict` - Slot no longer available

**Business Rules**:
- Appointments can be booked 24h-30 days in advance
- Cancellation allowed up to 24h before appointment
- Rescheduling allowed up to 48h before appointment

---

## 4. Get User's Appointments

**Endpoint**: `GET /appointments?status=confirmed&upcoming=true&limit=10`

**Authentication**: Required

**Description**: Get user's appointment history and upcoming bookings

**Query Parameters**:
- `status` (optional): confirmed, completed, cancelled, rescheduled
- `upcoming` (optional): boolean (default: true)
- `limit` (optional): Results per page (default: 10)
- `offset` (optional): Pagination offset

**Response** (200 OK):
```json
{
  "success": true,
  "appointments": [
    {
      "id": "apt_101jkl",
      "doctorId": "doc_456def",
      "doctorName": "Dr. Smith",
      "doctorAvatar": "https://cdn.example.com/avatars/doc_456def.jpg",
      "specialty": "depression",
      "scheduledTime": "2025-12-26T10:00:00Z",
      "endTime": "2025-12-26T10:45:00Z",
      "reason": "Depression screening",
      "mode": "video",
      "status": "confirmed",
      "fee": 500,
      "location": "Online",
      "joinUrl": "https://mindsync.local/sessions/apt_101jkl/join",
      "notes": "Dr. Smith will send session notes post-appointment",
      "reminders": {
        "email": true,
        "sms": false,
        "inApp": true
      }
    }
  ],
  "pagination": {
    "total": 5,
    "upcoming": 2,
    "past": 3
  }
}
```

---

## 5. Cancel Appointment

**Endpoint**: `PUT /appointments/:appointmentId/cancel`

**Authentication**: Required

**Description**: Cancel a booked appointment

**Request Body**:
```json
{
  "reason": "Schedule conflict",
  "rescheduleWanted": false
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Appointment cancelled successfully",
  "appointment": {
    "id": "apt_101jkl",
    "status": "cancelled",
    "cancelledAt": "2025-12-25T10:00:00Z",
    "refundStatus": "processing",
    "refundAmount": 500
  },
  "refund": {
    "status": "initiated",
    "amount": 500,
    "processedBy": "2025-12-27T10:00:00Z"
  }
}
```

**Error Responses**:
- `400 Bad Request` - Appointment within 24 hours (cancellation window closed)
- `404 Not Found` - Appointment not found

---

## 6. Reschedule Appointment

**Endpoint**: `PUT /appointments/:appointmentId/reschedule`

**Authentication**: Required

**Description**: Change appointment date/time

**Request Body**:
```json
{
  "newSlotId": "slot_789ghm",
  "reason": "Schedule conflict"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Appointment rescheduled successfully",
  "appointment": {
    "id": "apt_101jkl",
    "doctorId": "doc_456def",
    "oldScheduledTime": "2025-12-26T10:00:00Z",
    "newScheduledTime": "2025-12-27T14:00:00Z",
    "status": "confirmed",
    "rescheduledAt": "2025-12-25T10:05:00Z"
  }
}
```

---

## 7. Get Appointment Details

**Endpoint**: `GET /appointments/:appointmentId`

**Authentication**: Required

**Description**: Get detailed information about a specific appointment

**Response** (200 OK):
```json
{
  "success": true,
  "appointment": {
    "id": "apt_101jkl",
    "patientId": "user_123abc",
    "patientName": "John Doe",
    "doctorId": "doc_456def",
    "doctorName": "Dr. Smith",
    "scheduledTime": "2025-12-26T10:00:00Z",
    "endTime": "2025-12-26T10:45:00Z",
    "duration": 45,
    "reason": "Depression screening",
    "mode": "video",
    "status": "confirmed",
    "fee": 500,
    "paymentStatus": "paid",
    "joinUrl": "https://mindsync.local/sessions/apt_101jkl/join",
    "notes": {
      "patientNotes": "I prefer evening sessions",
      "doctorNotes": null,
      "prescription": null
    },
    "createdAt": "2025-12-25T09:50:00Z",
    "updatedAt": "2025-12-25T09:50:00Z"
  }
}
```

---

# 🎥 VIDEO SESSION APIS

## 1. Start Video Session

**Endpoint**: `POST /sessions/start`

**Authentication**: Required

**Description**: Initiate a video session and get peer connection details

**Request Body**:
```json
{
  "appointmentId": "apt_101jkl",
  "sessionType": "appointment"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "session": {
    "id": "sess_202xyz",
    "appointmentId": "apt_101jkl",
    "sessionType": "appointment",
    "initiatedBy": "user_123abc",
    "startTime": "2025-12-26T10:00:00Z",
    "status": "active",
    "participants": [
      {
        "userId": "user_123abc",
        "userType": "patient",
        "name": "John Doe",
        "joinedAt": "2025-12-26T10:00:00Z",
        "status": "connected"
      }
    ],
    "webrtcConfig": {
      "iceServers": [
        {"urls": ["stun:stun.l.google.com:19302"]},
        {"urls": ["stun:stun1.l.google.com:19302"]}
      ],
      "signalingServer": "wss://signal.mindsync.local"
    },
    "recordingEnabled": true,
    "emotionDetectionEnabled": true,
    "joinToken": "token_xyz789"
  }
}
```

---

## 2. End Video Session

**Endpoint**: `POST /sessions/:sessionId/end`

**Authentication**: Required

**Description**: Formally end a video session

**Request Body**:
```json
{
  "duration": 2700,
  "quality": "good",
  "technicalIssues": false
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "session": {
    "id": "sess_202xyz",
    "status": "completed",
    "startTime": "2025-12-26T10:00:00Z",
    "endTime": "2025-12-26T10:45:00Z",
    "duration": 2700,
    "recordingUrl": "s3://mindsync-recordings/sess_202xyz.webm",
    "emotionData": {
      "averageStressLevel": 6.2,
      "emotionTimeline": [
        {
          "timestamp": "2025-12-26T10:00:00Z",
          "emotion": "neutral",
          "confidence": 0.92
        }
      ]
    }
  }
}
```

---

## 3. Send Emotion Detection Data

**Endpoint**: `POST /sessions/:sessionId/emotion-data`

**Authentication**: Required

**Description**: Stream real-time emotion/facial analysis data during video session

**Request Body**:
```json
{
  "timestamp": "2025-12-26T10:01:30Z",
  "emotionDetection": {
    "happy": 0.12,
    "sad": 0.45,
    "angry": 0.08,
    "fearful": 0.22,
    "surprised": 0.05,
    "disgusted": 0.02,
    "neutral": 0.06
  },
  "facialExpressions": {
    "eyesOpen": 0.92,
    "mouthOpen": 0.15,
    "eyebrows": "slightly_furrowed"
  },
  "confidence": 0.89,
  "faceDetected": true
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "dataReceived": true,
  "stressLevel": 6.2,
  "trend": "stable"
}
```

**Note**: This should be called every 1-2 seconds during a video session. WebSocket alternative available for better performance.

---

## 4. Get Session Recording

**Endpoint**: `GET /sessions/:sessionId/recording`

**Authentication**: Required

**Description**: Get link to recorded session video (Doctor & Patient only)

**Response** (200 OK):
```json
{
  "success": true,
  "recording": {
    "id": "rec_303abc",
    "sessionId": "sess_202xyz",
    "recordingUrl": "s3://mindsync-recordings/sess_202xyz.webm",
    "duration": 2700,
    "fileSize": "145.3MB",
    "format": "WebM",
    "createdAt": "2025-12-26T10:45:00Z",
    "expiresAt": "2026-01-25T10:45:00Z",
    "downloadAllowed": true
  }
}
```

---

## 5. Save Session Notes (Doctor Only)

**Endpoint**: `POST /sessions/:sessionId/notes`

**Authentication**: Required (Doctor only)

**Description**: Doctor saves notes after session

**Request Body**:
```json
{
  "notes": "Patient shows signs of depression with significant anxiety component. Recommended: CBT sessions, medication evaluation",
  "prescription": {
    "medication": "Sertraline",
    "dosage": "50mg",
    "frequency": "once daily",
    "duration": "3 months"
  },
  "nextAppointment": "2025-01-02T10:00:00Z",
  "followUpRequired": true,
  "emotionalAssessment": {
    "stressLevel": 7.2,
    "coping": "below_average",
    "socialSupport": "moderate"
  }
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "notes": {
    "id": "note_404def",
    "sessionId": "sess_202xyz",
    "doctorId": "doc_456def",
    "savedAt": "2025-12-26T10:46:00Z",
    "notesPreview": "Patient shows signs of depression...",
    "prescription": {
      "id": "presc_505ghi",
      "medications": 1,
      "nextReviewDate": "2026-01-02"
    }
  }
}
```

---

## 6. Get Session Notes

**Endpoint**: `GET /sessions/:sessionId/notes`

**Authentication**: Required

**Description**: Retrieve session notes and prescriptions (Patient & Doctor)

**Response** (200 OK):
```json
{
  "success": true,
  "notes": {
    "id": "note_404def",
    "sessionId": "sess_202xyz",
    "doctorName": "Dr. Smith",
    "content": "Patient shows signs of depression...",
    "createdAt": "2025-12-26T10:46:00Z",
    "prescription": {
      "id": "presc_505ghi",
      "medications": [
        {
          "name": "Sertraline",
          "dosage": "50mg",
          "frequency": "once daily",
          "duration": "3 months",
          "instructions": "Take with food"
        }
      ]
    },
    "followUpRequired": true,
    "nextAppointmentRecommended": "2025-01-02T10:00:00Z"
  }
}
```

---

# 💬 COMMUNITY APIS

All community endpoints support **real-time WebSocket events** for live updates.

## 1. Get Community Feed

**Endpoint**: `GET /community/posts?sort=latest&limit=20&offset=0`

**Authentication**: Required

**Description**: Get paginated community feed with sorting

**Query Parameters**:
- `sort` (optional): latest, trending, mostCommented (default: latest)
- `limit` (optional): Posts per page (default: 20, max: 100)
- `offset` (optional): Pagination offset
- `categoryFilter` (optional): Filter by topic (mental_health, recovery, daily_life, resources, success_stories)
- `timeRange` (optional): today, week, month, all (default: all)

**Response** (200 OK):
```json
{
  "success": true,
  "posts": [
    {
      "id": "post_606jkl",
      "authorId": "user_123abc",
      "authorName": "John Doe",
      "authorAvatar": "https://cdn.example.com/avatars/user_123abc.jpg",
      "isAnonymous": false,
      "content": "Just completed my first therapy session! Feeling hopeful about my journey.",
      "category": "success_stories",
      "tags": ["therapy", "mental_health", "progress"],
      "createdAt": "2025-12-25T08:30:00Z",
      "updatedAt": "2025-12-25T08:30:00Z",
      "stats": {
        "likes": 45,
        "comments": 12,
        "shares": 5
      },
      "isMine": false,
      "userInteraction": {
        "liked": false,
        "commented": false
      },
      "moderationStatus": "approved",
      "image": null
    }
  ],
  "pagination": {
    "total": 342,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## 2. Create Community Post

**Endpoint**: `POST /community/posts`

**Authentication**: Required

**Description**: Create a new community post

**Request Body**:
```json
{
  "content": "Just completed my first therapy session! Feeling hopeful about my journey.",
  "category": "success_stories",
  "tags": ["therapy", "mental_health", "progress"],
  "isAnonymous": false,
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Post created successfully",
  "post": {
    "id": "post_606jkl",
    "authorId": "user_123abc",
    "content": "Just completed my first therapy session!",
    "category": "success_stories",
    "createdAt": "2025-12-25T08:30:00Z",
    "status": "pending_moderation",
    "contentAnalysis": {
      "flagged": false,
      "reasons": [],
      "sentiment": "positive"
    }
  }
}
```

**Moderation**:
- Post is analyzed for harmful content (NLP)
- If flagged: Status = pending_moderation, Post not visible until approved
- If clean: Status = approved, Post visible immediately
- Moderation queue available to admins

---

## 3. Comment on Post

**Endpoint**: `POST /community/posts/:postId/comments`

**Authentication**: Required

**Description**: Add a comment to a community post

**Request Body**:
```json
{
  "content": "That's amazing! So happy for you. How are you feeling now?",
  "isAnonymous": false
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "comment": {
    "id": "comment_707klm",
    "postId": "post_606jkl",
    "authorId": "user_123abc",
    "authorName": "John Doe",
    "content": "That's amazing!",
    "createdAt": "2025-12-25T08:35:00Z",
    "stats": {
      "likes": 0
    },
    "status": "approved",
    "contentAnalysis": {
      "flagged": false
    }
  }
}
```

---

## 4. Like/React to Post

**Endpoint**: `POST /community/posts/:postId/react`

**Authentication**: Required

**Description**: Add emoji reaction to post (like, love, care, support, inspire)

**Request Body**:
```json
{
  "reaction": "love"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "reaction": {
    "postId": "post_606jkl",
    "userId": "user_123abc",
    "reaction": "love",
    "createdAt": "2025-12-25T08:36:00Z"
  },
  "postStats": {
    "likes": 46,
    "reactions": {
      "love": 12,
      "support": 8,
      "inspire": 5
    }
  }
}
```

---

## 5. Report/Flag Post

**Endpoint**: `POST /community/posts/:postId/report`

**Authentication**: Required

**Description**: Report inappropriate or harmful post

**Request Body**:
```json
{
  "reason": "self_harm_content",
  "description": "Post contains self-harm instructions"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "report": {
    "id": "report_808mno",
    "postId": "post_606jkl",
    "reportedBy": "user_123abc",
    "reason": "self_harm_content",
    "status": "submitted",
    "createdAt": "2025-12-25T08:37:00Z"
  }
}
```

---

## 6. Delete Own Post

**Endpoint**: `DELETE /community/posts/:postId`

**Authentication**: Required

**Description**: Delete user's own post (Admin can delete any post)

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

**Error Responses**:
- `403 Forbidden` - User doesn't own post
- `404 Not Found` - Post not found

---

# 📝 VOCAL JOURNAL APIS

## 1. Upload Audio Recording

**Endpoint**: `POST /journal/upload-audio`

**Authentication**: Required

**Description**: Upload audio recording for vocal analysis

**Request Headers**:
```
Content-Type: audio/wav (or audio/mp3, audio/webm, audio/ogg)
X-Audio-Duration: 30000 (milliseconds)
```

**Request Body**: Binary audio file (max 10MB, min 10s, max 60s)

**Response** (201 Created):
```json
{
  "success": true,
  "entry": {
    "id": "entry_909pqr",
    "userId": "user_123abc",
    "audioUrl": "s3://mindsync-journals/entry_909pqr.wav",
    "duration": 28000,
    "uploadedAt": "2025-12-25T08:40:00Z",
    "status": "processing",
    "analysis": null
  },
  "analysisEstimatedTime": "30 seconds"
}
```

---

## 2. Get Vocal Analysis Results

**Endpoint**: `GET /journal/entries/:entryId/analysis`

**Authentication**: Required

**Description**: Get AI analysis results for a journal entry (includes automatic mood tagging)

**Response** (200 OK):
```json
{
  "success": true,
  "analysis": {
    "entryId": "entry_909pqr",
    "analyzedAt": "2025-12-25T08:41:00Z",
    "audioMetrics": {
      "duration": 28000,
      "sampleRate": 44100,
      "channels": 1,
      "audioQuality": "good"
    },
    "vocalBiomarkers": {
      "fundamentalFrequency": {
        "mean": 145.2,
        "std": 23.4,
        "min": 98,
        "max": 287,
        "interpretation": "Normal range for speech"
      },
      "speechRate": {
        "wordsPerMinute": 142,
        "interpretation": "Slightly elevated (normal: 125-150 wpm)"
      },
      "voiceIntensity": {
        "mean": -20.5,
        "std": 5.2,
        "interpretation": "Moderate energy level"
      },
      "jitter": {
        "value": 0.82,
        "interpretation": "Normal vocal stability"
      },
      "shimmer": {
        "value": 2.1,
        "interpretation": "Normal vocal quality"
      },
      "pauseFrequency": {
        "pauses": 12,
        "avgPauseDuration": 0.8,
        "interpretation": "Normal pause patterns"
      }
    },
    "emotionDetection": {
      "primaryEmotion": "anxious",
      "confidence": 0.78,
      "emotionScores": {
        "happy": 0.05,
        "sad": 0.12,
        "anxious": 0.78,
        "angry": 0.02,
        "calm": 0.03
      }
    },
    "moodTags": [
      {
        "tag": "anxiety_indicators",
        "confidence": 0.78,
        "indicators": ["elevated_speech_rate", "high_frequency_variation"]
      },
      {
        "tag": "stress",
        "confidence": 0.65,
        "indicators": ["increased_intensity_variation", "frequent_pauses"]
      }
    ],
    "sentiment": {
      "overall": "negative",
      "polarity": -0.42,
      "subjectivity": 0.68
    },
    "transcription": "I've been feeling really overwhelmed lately with work and personal issues. It's been hard to focus and I just feel anxious most of the time.",
    "keyThemes": ["work_stress", "anxiety", "overwhelmed"],
    "riskIndicators": {
      "present": false,
      "flags": []
    },
    "recommendations": [
      {
        "type": "activity",
        "suggestion": "Breathing exercises for anxiety management",
        "link": "/relaxation/breathing"
      },
      {
        "type": "booking",
        "suggestion": "Consider booking appointment with anxiety specialist",
        "link": "/booking?specialty=anxiety"
      }
    ]
  }
}
```

---

## 3. Get All Journal Entries

**Endpoint**: `GET /journal/entries?limit=20&offset=0&sort=latest&analysisComplete=true`

**Authentication**: Required

**Description**: Get all vocal journal entries with filters

**Query Parameters**:
- `limit` (optional): Results per page (default: 20)
- `offset` (optional): Pagination offset
- `sort` (optional): latest, oldest, mostAnxious, mostDepressed
- `analysisComplete` (optional): boolean (default: true)
- `moodFilter` (optional): anxiety, depression, calm, happy, etc.
- `startDate` (optional): Filter from date (ISO 8601)
- `endDate` (optional): Filter to date (ISO 8601)

**Response** (200 OK):
```json
{
  "success": true,
  "entries": [
    {
      "id": "entry_909pqr",
      "uploadedAt": "2025-12-25T08:40:00Z",
      "duration": 28000,
      "audioUrl": "s3://mindsync-journals/entry_909pqr.wav",
      "transcription": "I've been feeling really overwhelmed...",
      "primaryMood": "anxious",
      "moodConfidence": 0.78,
      "allMoods": ["anxiety_indicators", "stress"],
      "sentiment": "negative",
      "analysisStatus": "complete",
      "dayOfWeek": "Thursday"
    }
  ],
  "moodTrend": {
    "pastWeek": ["calm", "calm", "anxious", "stressed", "anxious", "stressed", "anxious"],
    "averageMood": "anxious"
  },
  "pagination": {
    "total": 34,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## 4. Get Mood Calendar (Visualization)

**Endpoint**: `GET /journal/mood-calendar?month=12&year=2025`

**Authentication**: Required

**Description**: Get mood data for calendar heatmap visualization

**Query Parameters**:
- `month` (optional): 1-12
- `year` (optional): YYYY format
- `type` (optional): voice, manual, all (default: all)

**Response** (200 OK):
```json
{
  "success": true,
  "calendarData": [
    {
      "date": "2025-12-01",
      "dayOfWeek": "Monday",
      "mood": "calm",
      "entries": 1,
      "intensity": 0.6,
      "color": "green"
    },
    {
      "date": "2025-12-02",
      "dayOfWeek": "Tuesday",
      "mood": "anxious",
      "entries": 1,
      "intensity": 0.8,
      "color": "orange"
    },
    {
      "date": "2025-12-25",
      "dayOfWeek": "Thursday",
      "mood": "anxious",
      "entries": 1,
      "intensity": 0.78,
      "color": "orange"
    }
  ],
  "monthStats": {
    "totalEntries": 18,
    "dominantMood": "anxious",
    "trend": "stable"
  },
  "colorLegend": {
    "green": "calm/happy",
    "yellow": "neutral",
    "orange": "stressed/anxious",
    "red": "very_distressed"
  }
}
```

---

## 5. Delete Journal Entry

**Endpoint**: `DELETE /journal/entries/:entryId`

**Authentication**: Required

**Description**: Delete a journal entry and its analysis

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Journal entry deleted successfully"
}
```

---

# 👨‍⚕️ GUARDIAN/CAREGIVER APIS

## 1. Generate Guardian Invitation Token

**Endpoint**: `POST /guardian/invite`

**Authentication**: Required (Patient only)

**Description**: Generate invitation token for guardian/caregiver

**Request Body**:
```json
{
  "email": "parent@example.com",
  "relationship": "parent",
  "permissions": ["mood_tracking", "appointment_logs"],
  "expiresIn": 2592000
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "invitation": {
    "id": "inv_010stu",
    "token": "guardian_token_abc123xyz",
    "inviteCode": "MSG-2025-001",
    "email": "parent@example.com",
    "relationship": "parent",
    "permissions": ["mood_tracking", "appointment_logs"],
    "expiresAt": "2026-01-24T08:45:00Z",
    "status": "pending",
    "inviteLink": "https://mindsync.local/guardian/accept/guardian_token_abc123xyz"
  }
}
```

---

## 2. Accept Guardian Invitation

**Endpoint**: `POST /guardian/accept-invitation`

**Public Access**: Yes (with valid token)

**Description**: Guardian accepts invitation and gains access

**Request Body**:
```json
{
  "token": "guardian_token_abc123xyz"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Invitation accepted successfully",
  "guardianAccess": {
    "id": "access_111uv",
    "patientId": "user_123abc",
    "guardianId": "user_456ghi",
    "relationship": "parent",
    "permissions": ["mood_tracking", "appointment_logs"],
    "accessGrantedAt": "2025-12-25T08:45:00Z",
    "status": "active"
  },
  "loginToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 3. Get Guardian Permissions

**Endpoint**: `GET /guardian/permissions`

**Authentication**: Required (Guardian)

**Description**: Get what data guardian can access

**Response** (200 OK):
```json
{
  "success": true,
  "permissions": {
    "patientName": "John Doe",
    "patientId": "user_123abc",
    "relationship": "parent",
    "grantedPermissions": [
      {
        "resource": "mood_tracking",
        "allowed": true,
        "details": "Can view mood calendar and trends"
      },
      {
        "resource": "appointment_logs",
        "allowed": true,
        "details": "Can view appointment dates and doctor names"
      },
      {
        "resource": "chat_logs",
        "allowed": false,
        "details": "REDACTED - Privacy protected"
      },
      {
        "resource": "journal_entries",
        "allowed": false,
        "details": "REDACTED - Privacy protected"
      },
      {
        "resource": "prescriptions",
        "allowed": true,
        "details": "Can view medication information and frequency"
      }
    ],
    "accessStartDate": "2025-12-25T08:45:00Z"
  }
}
```

---

## 4. Get Patient Summary (Guardian View)

**Endpoint**: `GET /guardian/patient-summary`

**Authentication**: Required (Guardian)

**Description**: Get redacted patient data visible to guardian

**Response** (200 OK):
```json
{
  "success": true,
  "patientSummary": {
    "patientId": "user_123abc",
    "patientName": "John Doe",
    "relationship": "parent",
    "moodTracking": {
      "currentMood": "anxious",
      "moodTrend": "stable",
      "pastWeekMoods": ["calm", "calm", "anxious", "stressed", "anxious", "stressed", "anxious"],
      "averageMood": "anxious"
    },
    "appointments": [
      {
        "id": "apt_101jkl",
        "doctorName": "Dr. Smith",
        "specialty": "depression",
        "scheduledTime": "2025-12-26T10:00:00Z",
        "status": "confirmed",
        "doctorContact": "REDACTED"
      }
    ],
    "medications": [
      {
        "name": "Sertraline",
        "dosage": "50mg",
        "frequency": "once daily",
        "startDate": "2025-12-20",
        "doctorName": "Dr. Smith"
      }
    ],
    "alerts": [
      {
        "type": "high_stress_detected",
        "date": "2025-12-24",
        "severity": "medium"
      }
    ],
    "chatLogs": "REDACTED - Full text hidden for privacy",
    "journalEntries": "REDACTED - Audio and transcriptions hidden for privacy"
  }
}
```

---

## 5. Revoke Guardian Access

**Endpoint**: `PUT /guardian/:accessId/revoke`

**Authentication**: Required (Patient only)

**Description**: Remove guardian's access to patient data

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Guardian access revoked successfully",
  "revokedAt": "2025-12-25T08:50:00Z"
}
```

---

# 📊 DASHBOARD/ANALYTICS APIS

## 1. Get Dashboard Overview

**Endpoint**: `GET /dashboard/overview`

**Authentication**: Required

**Description**: Get user's dashboard main overview (varies by role)

**Response** (200 OK) - Patient:
```json
{
  "success": true,
  "userType": "patient",
  "dashboard": {
    "nextAppointment": {
      "id": "apt_101jkl",
      "doctorName": "Dr. Smith",
      "time": "2025-12-26T10:00:00Z",
      "countdown": "in 22 hours",
      "status": "confirmed"
    },
    "currentMoodStatus": {
      "mood": "anxious",
      "lastUpdated": "2025-12-25T08:40:00Z",
      "trend": "stable"
    },
    "quickStats": {
      "appointmentsCompleted": 2,
      "journalEntriesThisWeek": 3,
      "communityPostsCreated": 5,
      "streakDays": 12
    },
    "recentActivity": [
      {
        "type": "appointment_completed",
        "date": "2025-12-19T10:00:00Z",
        "description": "Session with Dr. Smith"
      },
      {
        "type": "journal_entry",
        "date": "2025-12-25T08:40:00Z",
        "description": "Vocal journal recorded"
      }
    ],
    "recommendations": [
      {
        "type": "action",
        "suggestion": "Complete your daily mood check-in",
        "priority": "high"
      }
    ]
  }
}
```

---

## 2. Get Mood Calendar/Heatmap

**Endpoint**: `GET /dashboard/mood-calendar?month=12&year=2025`

**Authentication**: Required

**Description**: Get mood data for heatmap visualization (GitHub contributions style)

**Query Parameters**:
- `month` (optional): 1-12
- `year` (optional): YYYY
- `dataSource` (optional): journal, appointments, manual, all (default: all)

**Response** (200 OK):
```json
{
  "success": true,
  "calendarData": [
    {
      "date": "2025-12-01",
      "mood": "calm",
      "intensity": 0.6,
      "entries": 1,
      "color": "green"
    },
    {
      "date": "2025-12-25",
      "mood": "anxious",
      "intensity": 0.78,
      "entries": 1,
      "color": "orange"
    }
  ],
  "monthStats": {
    "totalDaysTracked": 18,
    "mostFrequentMood": "anxious",
    "healthiestDay": "2025-12-05",
    "trend": "stable"
  },
  "colorScale": {
    "green": "very_good",
    "yellow": "good",
    "orange": "moderate",
    "red": "poor",
    "gray": "no_data"
  }
}
```

---

## 3. Get Mood Trends & Analytics

**Endpoint**: `GET /dashboard/analytics?period=week&metrics=all`

**Authentication**: Required

**Description**: Get detailed mood trends and health metrics

**Query Parameters**:
- `period` (optional): day, week, month, quarter, year (default: week)
- `metrics` (optional): mood, stress, sleep, anxiety, depression, all (default: all)

**Response** (200 OK):
```json
{
  "success": true,
  "period": "week",
  "startDate": "2025-12-18",
  "endDate": "2025-12-25",
  "analytics": {
    "mood": {
      "averageScore": 5.2,
      "trend": "stable",
      "distribution": {
        "happy": 0.12,
        "calm": 0.29,
        "neutral": 0.18,
        "anxious": 0.35,
        "sad": 0.06
      },
      "dayByDay": [
        {
          "date": "2025-12-18",
          "score": 4.8,
          "mood": "calm"
        },
        {
          "date": "2025-12-25",
          "score": 6.2,
          "mood": "anxious"
        }
      ]
    },
    "stress": {
      "averageLevel": 6.2,
      "peakTime": "2025-12-23T14:30:00Z",
      "triggers": ["work_deadline", "family_issues"],
      "managementTechniquesUsed": ["breathing_exercises", "meditation"]
    },
    "appointments": {
      "completed": 1,
      "scheduled": 1,
      "cancellations": 0
    },
    "journalActivity": {
      "entriesThisWeek": 3,
      "consistencyScore": 0.65
    },
    "communityEngagement": {
      "postsCreated": 2,
      "commentsWritten": 5,
      "reactionsGiven": 8
    }
  },
  "progressComparison": {
    "comparedToPreviousPeriod": "stable",
    "changePercentage": 0
  }
}
```

---

## 4. Get Doctor Dashboard (Doctor Role)

**Endpoint**: `GET /dashboard/doctor`

**Authentication**: Required (Doctor only)

**Description**: Get doctor's dashboard with patient list and schedule

**Response** (200 OK):
```json
{
  "success": true,
  "userType": "doctor",
  "dashboard": {
    "todaySchedule": [
      {
        "appointmentId": "apt_101jkl",
        "patientName": "John Doe",
        "time": "2025-12-26T10:00:00Z",
        "duration": 45,
        "status": "upcoming",
        "joinUrl": "https://mindsync.local/sessions/apt_101jkl/join"
      }
    ],
    "upcomingAppointments": {
      "today": 3,
      "tomorrow": 2,
      "nextWeek": 8
    },
    "patients": [
      {
        "patientId": "user_123abc",
        "patientName": "John Doe",
        "lastSessionDate": "2025-12-19T10:00:00Z",
        "nextSessionDate": "2025-12-26T10:00:00Z",
        "sessionCount": 2,
        "condition": "Depression, Anxiety"
      }
    ],
    "stats": {
      "totalPatients": 24,
      "completedSessionsThisMonth": 18,
      "averageSessionRating": 4.7
    }
  }
}
```

---

# 🎵 RELAXATION HUB APIS

## 1. Get Relaxation Activities

**Endpoint**: `GET /relaxation/activities?category=breathing&difficulty=beginner`

**Authentication**: Required

**Description**: Get list of relaxation exercises and guided activities

**Query Parameters**:
- `category` (optional): breathing, meditation, music, muscle_relaxation, sleep, all
- `difficulty` (optional): beginner, intermediate, advanced
- `duration` (optional): Filter by duration (5, 10, 15, 20, 30 minutes)

**Response** (200 OK):
```json
{
  "success": true,
  "activities": [
    {
      "id": "activity_112vwx",
      "title": "4-7-8 Breathing Technique",
      "category": "breathing",
      "description": "A calming breathing exercise to reduce anxiety",
      "difficulty": "beginner",
      "duration": 5,
      "instructor": "Dr. Sarah Johnson",
      "audioUrl": "https://cdn.mindsync.local/audio/478breathing.mp3",
      "imageUrl": "https://cdn.mindsync.local/images/breathing.jpg",
      "instructions": ["Inhale for 4 counts", "Hold for 7 counts", "Exhale for 8 counts"],
      "rating": 4.8,
      "completions": 1203
    }
  ]
}
```

---

## 2. Start Relaxation Activity

**Endpoint**: `POST /relaxation/activities/:activityId/start`

**Authentication**: Required

**Description**: Start a relaxation activity session

**Request Body**:
```json
{
  "activityId": "activity_112vwx"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "session": {
    "sessionId": "relax_sess_113yz",
    "activityId": "activity_112vwx",
    "startTime": "2025-12-25T09:00:00Z",
    "estimatedDuration": 300,
    "audioStream": "https://stream.mindsync.local/relax_sess_113yz"
  }
}
```

---

## 3. Complete Relaxation Activity

**Endpoint**: `POST /relaxation/activities/:sessionId/complete`

**Authentication**: Required

**Description**: Mark relaxation activity as completed

**Request Body**:
```json
{
  "completed": true,
  "rating": 5,
  "feedback": "Very helpful for my anxiety",
  "moodBefore": "anxious",
  "moodAfter": "calm"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Activity completed successfully",
  "stats": {
    "sessionDuration": 302,
    "moodImprovement": 3.2,
    "streakCount": 5
  }
}
```

---

# 🔌 WEBSOCKET EVENTS

WebSocket connection: `wss://mindsync.local/socket.io`

All WebSocket events require **JWT authentication** via query param: `?token=eyJhbGciOi...`

## Community Events (Real-Time)

### Subscribe to Community Feed
```javascript
socket.on('community:subscribe', (channel) => {
  // Subscribes to real-time feed updates
});

socket.on('community:new_post', (post) => {
  // {id, authorName, content, createdAt, stats: {likes, comments}}
  console.log('New post:', post);
});

socket.on('community:new_comment', (comment) => {
  // {id, postId, authorName, content, createdAt}
  console.log('New comment:', comment);
});

socket.on('community:post_reacted', (data) => {
  // {postId, reaction, totalReactions}
  console.log('Post reacted:', data);
});

socket.on('community:post_flagged', (data) => {
  // {postId, reason, status}  - Only for admins
  console.log('Post flagged:', data);
});
```

## Appointment Events

### Subscribe to Appointment Updates
```javascript
socket.on('appointment:upcoming', (appointment) => {
  // {appointmentId, doctorName, timeRemaining}
  console.log('Upcoming appointment reminder:', appointment);
});

socket.on('appointment:doctor_joined', (data) => {
  // {appointmentId, doctorName} - When doctor joins video session
  console.log('Doctor joined:', data);
});
```

## Video Session Events

### Real-Time Session Sync
```javascript
socket.on('session:emotion_update', (emotionData) => {
  // {sessionId, emotion, confidence, stressLevel, timestamp}
  console.log('Emotion detected:', emotionData);
});

socket.on('session:peer_connected', (data) => {
  // {sessionId, peerId, participantName}
  console.log('Peer connected:', data);
});

socket.on('session:peer_disconnected', (data) => {
  // {sessionId, peerId}
  console.log('Peer disconnected:', data);
});
```

## Triage Events

### Risk Level Updates
```javascript
socket.on('triage:risk_escalated', (data) => {
  // {riskLevel, score, indicators}
  console.log('Risk escalated:', data);
});

socket.on('triage:admin_notification', (data) => {
  // {userId, riskLevel, message} - For admin dashboard
  console.log('Admin alert:', data);
});
```

## Crisis Events

### Emergency Protocol Activation
```javascript
socket.on('crisis:protocol_activated', (data) => {
  // {userId, triggerPhrase, timestamp, counselorAssigned}
  console.log('Crisis protocol activated:', data);
});

socket.on('crisis:counselor_connecting', (data) => {
  // {counselorName, estimatedWaitTime}
  console.log('Emergency counselor connecting:', data);
});
```

## Notification Events

### General Notifications
```javascript
socket.on('notification:new', (notification) => {
  // {id, type, message, actionUrl, timestamp}
  // Types: appointment_reminder, new_comment, emergency, system
  console.log('New notification:', notification);
});
```

---

## Emitting Events (Client to Server)

### Update Mood in Real-Time
```javascript
socket.emit('user:mood_update', {
  currentMood: 'calm',
  timestamp: new Date(),
  source: 'manual' // or 'journal', 'appointment'
});
```

### Send Chat Message (Triage)
```javascript
socket.emit('triage:send_message', {
  message: 'I am feeling anxious',
  sessionId: 'session_123abc'
});
```

### Broadcast Emotion Data (Video Session)
```javascript
socket.emit('session:emotion_data', {
  sessionId: 'sess_202xyz',
  emotionDetection: {...},
  timestamp: new Date()
});
```

---

# 🔐 Error Response Format

All endpoints follow standard error response format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "status": 400,
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ],
    "timestamp": "2025-12-25T09:00:00Z",
    "requestId": "req_abc123xyz"
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR` (400) - Input validation failed
- `UNAUTHORIZED` (401) - Missing or invalid authentication
- `FORBIDDEN` (403) - User doesn't have permission
- `NOT_FOUND` (404) - Resource not found
- `CONFLICT` (409) - Resource already exists
- `RATE_LIMITED` (429) - Too many requests
- `INTERNAL_ERROR` (500) - Server error
- `SERVICE_UNAVAILABLE` (503) - External service down (OpenAI, etc.)

---

# 📋 Summary

**Total APIs: 42 Core Endpoints**
- Authentication: 8
- AI Triage: 4
- Appointments: 7
- Video Sessions: 6
- Community: 6
- Vocal Journal: 5
- Guardian: 5
- Dashboard: 4
- Relaxation: 3
- WebSocket Events: 10+ real-time channels

All APIs require `Content-Type: application/json` except file uploads.

**Last Updated**: December 25, 2025
**Version**: 1.0.0
