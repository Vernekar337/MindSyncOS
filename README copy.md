# 🧠 MindSync OS - The Comprehensive Mental Health Operating System

## Executive Summary

**MindSync OS** is a production-ready mental health ecosystem that transforms how users access mental healthcare. Unlike traditional appointment-booking apps, MindSync combines **AI-driven intelligent triage, real-time biometric analysis, community safety systems, and crisis routing** into a unified platform.

The system acts as a **First Responder**, proactively assessing user risk through AI conversation, routing them to appropriate resources (self-care, professional help, or emergency services), and maintaining continuous support through community and one-on-one telehealth.

---

## 🎯 Problem Statement

Mental health support is **fragmented and reactive**:
- Users must self-diagnose and manually search for help
- In crises, scrolling through doctor lists wastes critical time
- Traditional apps treat all users the same (no risk-based routing)
- Community spaces lack safety mechanisms
- Privacy concerns prevent guardians from offering support
- Therapy sessions lack real-time insight into patient emotional state

**MindSync OS solves this** by automating risk assessment, providing instant crisis response, and building trust through transparent, safe community interactions.

---

## ✨ Core Features

### **ROUND 1 (5-Day Sprint) - MVP Foundation + Wow Factors**

#### 1. **Authentication & Role Management**
- JWT-based secure login/signup
- Multi-role support: Patient, Doctor, Admin, Guardian
- Email verification & password reset
- Token refresh mechanism
- Role-based access control (RBAC)

#### 2. **AI Triage Engine (First Responder System)**
- Real-time conversational AI chatbot (OpenAI API)
- Sentiment & risk analysis on every message
- Automatic risk classification:
  - 🟢 **Low Risk**: Route to Relaxation Hub
  - 🟡 **Medium Risk**: Suggest doctor booking
  - 🔴 **High Risk**: Trigger Crisis Protocol
- Chat history storage & context awareness

#### 3. **Smart Appointment Booking System**
- Doctor profiles with specialization & availability
- Slot-based booking with real-time availability
- Appointment confirmation & reminders
- Cancellation with reason tracking
- Doctor dashboard for slot management

#### 4. **In-Browser Telehealth Video Sessions (WebRTC)**
- Peer-to-peer encrypted video calling (PeerJS)
- Custom video UI (no third-party embeds)
- Session recording metadata
- Post-session notes & prescriptions (Doctor)
- Real-time emotion HUD (facial expression analysis with face-api.js)

#### 5. **Community Support System (Real-Time)**
- Live community feed with Socket.io
- Post creation, comments, and reactions
- Real-time message broadcasting
- NLP-based content moderation (auto-block harmful content)
- User profiles with anonymity options
- Moderation dashboard (Admin)

#### 6. **Vocal Biomarker Journal (Signal Processing)**
- 30-second audio diary recording
- Audio waveform analysis (tone, pitch, speed)
- Auto-generated mood tags (Depression, Anxiety, Stable, etc.)
- Voice-to-text transcription
- Mood trending over time

#### 7. **Basic Guardian/Caregiver Access (RBAC)**
- Guardian invitation & token generation
- Limited data visibility:
  - ✅ Mood graphs & trends
  - ✅ Appointment logs
  - ❌ Redacted chat logs (privacy protected)
- Notification preferences

#### 8. **Crisis Routing Switchboard**
- AI detects high-risk phrases (self-harm, suicidal ideation)
- App state transforms to SOS_MODE:
  - Navigation bar hidden
  - Relaxing ambient audio auto-plays
  - "Connect Now" button appears
  - Simulated emergency counselor connection (Twilio-ready)
- Crisis hotline list by region

#### 9. **Relaxation Hub (Self-Care)**
- Guided breathing exercises
- Meditation library
- Calming music & ambient sounds
- Progressive muscle relaxation (PMR) guides
- Interactive mood tracker

#### 10. **Dashboard & Analytics**
- Patient: Mood calendar heatmap, session history, upcoming appointments
- Doctor: Patient list, appointment schedule, session notes
- Admin: User stats, community moderation queue, system health

---

### **ROUND 2 (Additional Features - Post MVP)**

#### 1. **Co-Breathing Multiplayer Rooms**
- Anonymous panic recovery sessions
- Synchronized breathing animation (5-10 users)
- Real-time animation sync via WebSockets
- Session-based anonymous identity
- Post-session sentiment check-in

#### 2. **Advanced Emotion HUD During Sessions**
- Real-time facial micro-expression detection
- Live stress level graph overlay
- Emotion probability breakdown (Happy, Sad, Angry, Fearful, etc.)
- Doctor gets real-time emotional insights
- Post-session emotion trend report

#### 3. **Collaborative Whiteboard in Video Sessions**
- HTML5 Canvas drawing during calls
- Real-time sync between doctor & patient
- Art therapy support (shapes, colors, free drawing)
- Session drawing history export

#### 4. **Advanced Vocal Analysis**
- Speech rate variability (indicator of anxiety/mania)
- Fundamental frequency analysis (pitch changes)
- Energy/intensity analysis
- Long-term vocal pattern changes
- Integration with mood predictions

#### 5. **Predictive Mental Health Assessments**
- ML model trained on mood + vocal + text data
- Risk prediction for next 7 days
- Proactive appointment suggestions
- Depression/Anxiety severity scoring
- Treatment recommendation engine

#### 6. **Premium Content Library**
- Expert articles on mental health topics
- Video lessons from professional psychologists
- Downloadable workbooks & worksheets
- CBT exercises & techniques
- Sleep hygiene guides

#### 7. **Social Connection Features**
- Friend/follow system
- Private messaging between users
- Support group matching (based on issues)
- Peer mentorship program

#### 8. **Data Privacy & Export**
- GDPR-compliant data export
- End-to-end encryption for chat logs
- Audit logs for guardian access
- Right to be forgotten implementation

#### 9. **Analytics & Insights for Doctors**
- Patient progress dashboards
- Treatment effectiveness metrics
- Predictive intervention alerts
- Peer comparison anonymized data

#### 10. **Mobile Optimization & PWA**
- Progressive Web App support
- Offline functionality
- Push notifications
- Mobile-first responsive design

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React.js, Redux, Tailwind CSS | Fast, responsive UI with state management |
| **Backend** | Node.js, Express.js | REST APIs, WebSocket handling, business logic |
| **Real-Time** | Socket.io | Community chat, co-breathing sync, notifications |
| **Database** | MongoDB | Flexible document storage for diverse data types |
| **AI/ML** | Python (Flask), OpenAI API, librosa, face-api.js | Sentiment analysis, vocal biomarkers, emotion detection |
| **Video** | WebRTC, PeerJS | Peer-to-peer encrypted video calling |
| **Audio** | Web Audio API, librosa | Audio recording & analysis |
| **Authentication** | JWT, bcrypt | Secure token-based auth |
| **Storage** | MongoDB GridFS, AWS S3 (optional) | Video/audio file storage |
| **Deployment** | Docker, Heroku/AWS | Containerization & cloud hosting |

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React.js)                       │
│  Dashboard │ Booking │ Video │ Community │ Journal │ Relax Hub   │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST + WebSocket
┌────────────────────────────┴────────────────────────────────────┐
│                    API GATEWAY (Express.js)                      │
│  Auth │ Booking │ Sessions │ Community │ Journal │ Analytics    │
└────────────────┬──────────────────────────────┬─────────────────┘
                 │                              │
         ┌───────▼──────────┐          ┌────────▼──────────┐
         │   MongoDB        │          │  Socket.io        │
         │   Storage        │          │  Real-Time Sync   │
         └──────────────────┘          └───────────────────┘
         
┌──────────────────────────────────────────────────────────────────┐
│              ML/AI MICROSERVICE (Python Flask)                   │
│  OpenAI API │ Sentiment │ Vocal Analysis │ Emotion Detection    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│              EXTERNAL SERVICES                                   │
│  OpenAI │ Twilio (SMS/Call) │ SendGrid (Email) │ WebRTC STUN   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ & npm
- Python 3.8+ & pip
- MongoDB 4.4+
- Git

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/your-org/mindsync-os.git
cd mindsync-os
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/mindsync
JWT_SECRET=your_jwt_secret_key_here
OPENAI_API_KEY=your_openai_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
NODE_ENV=development
PORT=5000
EOF

npm run dev
```

#### 3. ML Service Setup
```bash
cd ../ml-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install -r requirements.txt

# Create .env file
cat > .env << EOF
OPENAI_API_KEY=your_openai_key
FLASK_ENV=development
PORT=5001
EOF

python app.py
```

#### 4. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_ML_SERVICE_URL=http://localhost:5001
EOF

npm start
```

#### 5. Database Initialization
```bash
# From backend directory
npm run seed  # Populates initial doctors, categories, etc.
```

---

## 📚 API Overview

### Authentication APIs
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh-token` - Token refresh
- `POST /auth/logout` - User logout
- `POST /auth/reset-password` - Password reset

### AI Triage APIs
- `POST /api/triage/chat` - Send message to AI chatbot
- `GET /api/triage/chat-history` - Retrieve chat history
- `GET /api/triage/risk-level` - Get current risk assessment

### Booking APIs
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/:id/slots` - Get available slots
- `POST /api/appointments` - Book appointment
- `GET /api/appointments` - Get user appointments
- `PUT /api/appointments/:id/cancel` - Cancel appointment

### Video Session APIs
- `POST /api/sessions/start` - Initiate video session
- `POST /api/sessions/end` - End session
- `POST /api/sessions/:id/emotion-data` - Send emotion HUD data
- `GET /api/sessions/:id/notes` - Get session notes

### Community APIs
- `GET /api/community/posts` - Get feed (real-time via WebSocket)
- `POST /api/community/posts` - Create post
- `POST /api/community/posts/:id/comment` - Comment on post
- `POST /api/community/posts/:id/react` - React to post

### Vocal Journal APIs
- `POST /api/journal/upload-audio` - Upload voice recording
- `GET /api/journal/entries` - Get all journal entries
- `GET /api/journal/analysis` - Get vocal analysis & mood tags

### Guardian APIs
- `POST /api/guardian/invite` - Send guardian invitation
- `GET /api/guardian/permissions` - View permitted data
- `GET /api/guardian/patient-summary` - Get redacted patient data

### Dashboard APIs
- `GET /api/dashboard/mood-calendar` - Get mood heatmap data
- `GET /api/dashboard/analytics` - Get user analytics

See **API_DOCUMENTATION.md** for complete endpoint details.

---

## 💾 Database Schema Overview

Key Collections:
- **users** - Patient, Doctor, Admin, Guardian profiles
- **appointments** - Booking records with status
- **sessions** - Video call metadata & recordings
- **chat_messages** - AI triage & community messages
- **vocal_journals** - Audio recordings & analysis results
- **community_posts** - Feed posts with moderation status
- **guardian_access** - Permission tokens & logs

See **DATABASE_SCHEMA.md** for complete schema.

---

## 🎨 Frontend Integration

Components map to APIs as follows:
- **LoginForm** → `/auth/login`, `/auth/register`
- **TriageChat** → `/api/triage/chat`, `/api/triage/risk-level`
- **BookingModal** → `/api/doctors`, `/api/doctors/:id/slots`, `/api/appointments`
- **VideoPlayer** → `/api/sessions/start`, `/api/sessions/end`, emotion HUD data
- **CommunityFeed** → `/api/community/posts` (WebSocket real-time)
- **VocalJournal** → `/api/journal/upload-audio`, `/api/journal/analysis`
- **Dashboard** → `/api/dashboard/mood-calendar`, `/api/dashboard/analytics`

See **FRONTEND_INTEGRATION_GUIDE.md** for detailed component mappings.

---

## 🔒 Security

- **Authentication**: JWT tokens with 24h expiration + refresh tokens
- **Authorization**: Role-based access control (RBAC) per endpoint
- **Data Encryption**: All sensitive data encrypted at rest (MongoDB)
- **Video**: WebRTC offers peer-to-peer encryption (no server-side recording)
- **Chat**: TLS/SSL for all API communications
- **Password**: bcrypt hashing with salt rounds = 10
- **Input Validation**: joi schema validation on all endpoints
- **Rate Limiting**: 100 requests/min per IP for public endpoints
- **CORS**: Whitelist trusted frontend domains only
- **Guardian Access**: Audit logs for all guardian data access

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd ../frontend
npm run test

# API integration tests
npm run test:integration
```

---

## 📦 Deployment

### Docker
```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

### Heroku
```bash
heroku login
heroku create mindsync-os
git push heroku main
heroku config:set MONGODB_URI=... JWT_SECRET=... OPENAI_API_KEY=...
```

### Environment Variables Required

**Backend:**
```
MONGODB_URI
JWT_SECRET
OPENAI_API_KEY
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
NODE_ENV
PORT
SENDGRID_API_KEY (for email)
AWS_S3_BUCKET (optional, for file storage)
CORS_ORIGIN (frontend URL)
```

**Frontend:**
```
REACT_APP_API_URL
REACT_APP_SOCKET_URL
REACT_APP_ML_SERVICE_URL
```

**ML Service:**
```
OPENAI_API_KEY
FLASK_ENV
PORT
```

---

## 📊 Performance Metrics (Round 1 Goals)

- **API Response Time**: < 200ms (p95)
- **WebSocket Latency**: < 100ms (message broadcast)
- **Video Connection**: < 2s peer connection establishment
- **AI Response Time**: < 3s (OpenAI API)
- **Database Query**: < 50ms (optimized indexes)

---

## 🎯 Demo Flow (Hackathon Presentation)

**Minute 1: The Crisis Detection**
1. Login as patient
2. Type high-risk phrase into AI Triage ("I want to hurt myself")
3. Show app state transform to SOS_MODE (red theme, hidden nav, music plays)
4. Show "Connect Now" button appearing

**Minute 2: The Vocal Analysis**
1. Record a 30-second voice note in Relaxation Hub
2. Show system auto-analyzing tone/pitch
3. Display "Detected: Anxiety Indicators" with confidence scores
4. Show mood tag auto-applied without manual input

**Minute 3: The Video Innovation**
1. Initiate video session between two laptops
2. Show custom WebRTC UI (not Zoom)
3. Display real-time emotion HUD on doctor's side
4. Show live stress graph updating during conversation

**Minute 4: The Community Safety**
1. Try to post harmful message in community
2. Show system intercepting it automatically
3. Show NLP detection message: "Content blocked for safety"
4. Show moderation queue with flagged content

**Minute 5: The Data Privacy**
1. Login as Guardian with limited token
2. Show mood graphs visible ✅
3. Show appointment logs visible ✅
4. Show chat logs are REDACTED ❌
5. Explain RBAC model for different user types

---

## 📝 File Structure

```
mindsync-os/
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── triage.js
│   │   ├── appointments.js
│   │   ├── sessions.js
│   │   ├── community.js
│   │   ├── journal.js
│   │   └── dashboard.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Appointment.js
│   │   ├── Session.js
│   │   ├── Message.js
│   │   ├── VocalJournal.js
│   │   └── CommunityPost.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── services/
│   │   ├── emailService.js
│   │   ├── sentimentService.js
│   │   └── moderationService.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── ml-service/
│   ├── models/
│   │   ├── sentiment_classifier.py
│   │   ├── vocal_analyzer.py
│   │   └── emotion_detector.py
│   ├── routes/
│   │   ├── triage.py
│   │   ├── vocal.py
│   │   └── emotion.py
│   ├── app.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Triage/
│   │   │   ├── Booking/
│   │   │   ├── VideoPlayer/
│   │   │   ├── Community/
│   │   │   ├── Journal/
│   │   │   └── Dashboard/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/ (Redux)
│   │   ├── utils/
│   │   └── App.js
│   ├── .env
│   └── package.json
├── docker-compose.yml
├── README.md
├── API_DOCUMENTATION.md
├── DATABASE_SCHEMA.md
└── FRONTEND_INTEGRATION_GUIDE.md
```

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👥 Team

- **Frontend Lead**: React.js & UI/UX
- **Backend Lead**: Node.js & Database
- **ML/AI Lead**: Python & OpenAI Integration
- **DevOps**: Deployment & Infrastructure

---

## 📞 Support

For questions or issues, contact: support@mindsync-os.dev

---

**Last Updated**: December 25, 2025
**Version**: 1.0.0 (Hackathon Round 1)
