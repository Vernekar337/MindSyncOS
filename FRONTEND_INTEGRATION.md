# 🎨 MindSync OS - Frontend Integration Guide

## Overview

This guide maps each frontend component to its corresponding API endpoints, state management patterns, and WebSocket connections.

**Frontend Framework**: React.js + Redux
**State Management**: Redux (Global) + Local Component State
**Real-Time Communication**: Socket.io (WebSockets)
**HTTP Client**: Axios with JWT Interceptor

---

## 📋 Integration Map

### Layer Structure

```
UI Components
    ↓
Redux Actions/Thunks
    ↓
API Service Layer (Axios)
    ↓
Backend APIs / WebSockets
    ↓
Database
```

---

# 1️⃣ AUTHENTICATION FLOW

## Components

### `LoginForm.jsx`
**Purpose**: User login interface

**APIs Used**:
- `POST /auth/login`
- `POST /auth/refresh-token`

**State Management**:
```javascript
// Redux State
auth: {
  user: {
    id, email, firstName, lastName, role, avatar
  },
  tokens: {
    accessToken,
    refreshToken,
    expiresIn
  },
  isAuthenticated: boolean,
  loading: boolean,
  error: null
}
```

**Component Logic**:
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  
  const handleSubmit = async (email, password) => {
    await dispatch(loginUser({ email, password }));
    // Redux action handles API call and token storage
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form JSX */}
    </form>
  );
};
```

**Redux Action**:
```javascript
// store/authSlice.js
import { loginAPI } from '@/services/authService';

const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await loginAPI(credentials);
    
    // Store tokens
    localStorage.setItem('accessToken', response.tokens.accessToken);
    localStorage.setItem('refreshToken', response.tokens.refreshToken);
    
    dispatch(setUser(response.user));
    dispatch(setAuthenticated(true));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
```

---

### `RegisterForm.jsx`
**Purpose**: New user registration

**APIs Used**:
- `POST /auth/register`
- `POST /auth/verify-email`

**Component Props**:
```javascript
{
  userRole: 'patient' | 'doctor', // Passed from role selection screen
  onSuccess: () => navigate('/verify-email')
}
```

**Integration**:
```javascript
const RegisterForm = ({ userRole, onSuccess }) => {
  const dispatch = useDispatch();
  
  const handleRegister = async (formData) => {
    const response = await dispatch(registerUser({
      ...formData,
      role: userRole
    }));
    
    if (response.success) {
      onSuccess(); // Navigate to email verification
    }
  };
  
  return (
    // Form JSX
  );
};
```

---

### `EmailVerification.jsx`
**Purpose**: Email verification interface

**APIs Used**:
- `POST /auth/verify-email`

**Flow**:
1. User receives verification token in email
2. User pastes token or clicks email link
3. Component calls verification API
4. On success, redirect to dashboard

```javascript
const EmailVerification = () => {
  const [token, setToken] = useState('');
  
  const handleVerify = async () => {
    const response = await verifyEmailAPI({ verificationToken: token });
    if (response.success) {
      navigate('/dashboard');
    }
  };
  
  return (
    // Verification UI
  );
};
```

---

### `PasswordReset.jsx`
**Purpose**: Password reset flow

**APIs Used**:
- `POST /auth/request-password-reset`
- `POST /auth/reset-password`

**Two-Step Flow**:
```javascript
// Step 1: Request reset (email sent)
const handleRequestReset = async (email) => {
  await requestPasswordReset({ email });
  setShowResetForm(true); // Show token input
};

// Step 2: Reset with token
const handleResetPassword = async (resetToken, newPassword) => {
  await resetPassword({ resetToken, newPassword });
  navigate('/login');
};
```

---

# 2️⃣ TRIAGE & AI CHAT FLOW

## Components

### `TriageChat.jsx`
**Purpose**: AI chatbot conversation interface

**APIs Used**:
- `POST /triage/chat` (Send message)
- `GET /triage/chat-history` (Get previous conversations)
- `GET /triage/risk-level` (Get current risk)
- `POST /triage/session/end` (End session)

**WebSocket Events**:
- `triage:send_message`
- `triage:risk_escalated`

**State Management**:
```javascript
triage: {
  messages: [{
    id, type: 'user'|'assistant',
    content, timestamp, sentiment
  }],
  currentSession: {
    id, startedAt, messageCount
  },
  riskAssessment: {
    level: 'low'|'medium'|'high',
    score: 0-10, confidence, indicators
  },
  loading: boolean,
  error: null
}
```

**Component Integration**:
```javascript
const TriageChat = () => {
  const dispatch = useDispatch();
  const { messages, riskAssessment } = useSelector(state => state.triage);
  const socket = useSocket();
  
  useEffect(() => {
    // Load chat history on mount
    dispatch(fetchChatHistory());
    
    // Subscribe to risk escalation events
    socket.on('triage:risk_escalated', (data) => {
      dispatch(updateRiskLevel(data));
    });
  }, []);
  
  const handleSendMessage = async (message) => {
    // Emit to server
    dispatch(sendTriageMessage({
      message,
      sessionId: currentSession.id
    }));
  };
  
  // Handle risk-based routing
  useEffect(() => {
    if (riskAssessment.level === 'high') {
      dispatch(activateCrisisProtocol());
      // UI transforms to SOS mode
    }
  }, [riskAssessment]);
  
  return (
    <div className="triage-chat">
      <MessageList messages={messages} />
      <MessageInput onSend={handleSendMessage} />
      <RiskIndicator level={riskAssessment.level} />
    </div>
  );
};
```

**API Service**:
```javascript
// services/triageService.js
export const sendTriageMessage = async (message, sessionId) => {
  const response = await apiClient.post('/triage/chat', {
    message,
    sessionId
  });
  
  return response.data;
};

export const getRiskLevel = async () => {
  const response = await apiClient.get('/triage/risk-level');
  return response.data;
};
```

---

### `CrisisProtocol.jsx`
**Purpose**: Crisis mode UI when high-risk detected

**APIs Used**:
- Part of Triage Chat flow

**Features**:
- Hidden navigation
- Ambient audio plays automatically
- "Connect Now" button prominently displayed
- Simulated emergency response

**Implementation**:
```javascript
const CrisisProtocol = () => {
  useEffect(() => {
    // Hide main navigation
    document.body.classList.add('crisis-mode');
    
    // Play calming audio
    const audio = new Audio('/audio/calming-background.mp3');
    audio.loop = true;
    audio.play();
    
    return () => {
      document.body.classList.remove('crisis-mode');
      audio.stop();
    };
  }, []);
  
  const handleEmergencyConnect = async () => {
    // Simulate emergency counselor connection
    // In production: Call Twilio API
    showToast('Connecting to emergency counselor...');
    await sleep(2000);
    showToast('Counselor John is connected');
  };
  
  return (
    <div className="crisis-modal">
      <h1>We're Here to Help</h1>
      <button onClick={handleEmergencyConnect} className="emergency-btn">
        Connect Now
      </button>
      <div className="crisis-hotlines">
        {/* Display crisis hotlines by region */}
      </div>
    </div>
  );
};
```

---

# 3️⃣ APPOINTMENT BOOKING FLOW

## Components

### `DoctorBrowser.jsx`
**Purpose**: List and filter doctors

**APIs Used**:
- `GET /appointments/doctors`

**Component Logic**:
```javascript
const DoctorBrowser = () => {
  const [filters, setFilters] = useState({
    specialty: '',
    available: true,
    rating: 0,
    search: ''
  });
  
  const doctors = useSelector(state => state.booking.doctors);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Fetch doctors whenever filters change
    dispatch(fetchDoctors(filters));
  }, [filters]);
  
  return (
    <div className="doctor-browser">
      <FilterBar onFilterChange={setFilters} />
      <DoctorGrid doctors={doctors} onSelectDoctor={handleSelectDoctor} />
    </div>
  );
};
```

**Redux Integration**:
```javascript
// store/bookingSlice.js
const fetchDoctors = (filters) => async (dispatch) => {
  const queryParams = new URLSearchParams(filters);
  const response = await apiClient.get(`/appointments/doctors?${queryParams}`);
  dispatch(setDoctors(response.data.doctors));
};
```

---

### `DoctorDetail.jsx`
**Purpose**: Show doctor profile and available slots

**APIs Used**:
- `GET /appointments/doctors/:doctorId/slots`

**Component Flow**:
```javascript
const DoctorDetail = ({ doctorId }) => {
  const dispatch = useDispatch();
  const doctor = useSelector(state => 
    state.booking.doctors.find(d => d.id === doctorId)
  );
  const availableSlots = useSelector(state => state.booking.slots);
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  useEffect(() => {
    // Fetch slots when date changes
    dispatch(fetchAvailableSlots({
      doctorId,
      date: selectedDate.toISOString().split('T')[0]
    }));
  }, [selectedDate]);
  
  return (
    <div className="doctor-detail">
      <DoctorProfile doctor={doctor} />
      <DatePicker onChange={setSelectedDate} />
      <SlotGrid 
        slots={availableSlots} 
        onSelectSlot={handleSelectSlot}
      />
      <BookingButton onClick={proceedToBooking} />
    </div>
  );
};
```

---

### `BookingForm.jsx`
**Purpose**: Complete booking with additional info

**APIs Used**:
- `POST /appointments/book`

**Component State**:
```javascript
const BookingForm = ({ doctorId, slotId }) => {
  const [formData, setFormData] = useState({
    reason: '',
    previousTreatment: '',
    medicationsCurrently: '',
    notes: '',
    preferredMode: 'video'
  });
  
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.booking);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(bookAppointment({
      doctorId,
      slotId,
      ...formData
    }));
    
    if (result.success) {
      navigate(`/appointments/${result.appointment.id}`);
      showToast('Appointment booked successfully!');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

---

### `AppointmentsList.jsx`
**Purpose**: Display user's appointments

**APIs Used**:
- `GET /appointments`

**Redux Integration**:
```javascript
const AppointmentsList = () => {
  const appointments = useSelector(state => state.booking.appointments);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUserAppointments());
  }, []);
  
  const handleCancel = async (appointmentId) => {
    if (window.confirm('Cancel this appointment?')) {
      await dispatch(cancelAppointment({
        appointmentId,
        reason: 'User cancellation'
      }));
    }
  };
  
  const handleReschedule = (appointmentId) => {
    navigate(`/reschedule/${appointmentId}`);
  };
  
  return (
    <div className="appointments-list">
      <Tabs>
        <Tab label="Upcoming">
          {appointments.filter(a => a.status === 'confirmed').map(apt => (
            <AppointmentCard 
              key={apt.id} 
              appointment={apt}
              onCancel={handleCancel}
              onReschedule={handleReschedule}
            />
          ))}
        </Tab>
        <Tab label="Past">
          {appointments.filter(a => a.status === 'completed').map(apt => (
            <AppointmentCard key={apt.id} appointment={apt} />
          ))}
        </Tab>
      </Tabs>
    </div>
  );
};
```

---

# 4️⃣ VIDEO SESSION FLOW

## Components

### `VideoSession.jsx`
**Purpose**: In-browser peer-to-peer video call

**APIs Used**:
- `POST /sessions/start`
- `POST /sessions/end`
- `POST /sessions/:sessionId/emotion-data`
- `GET /sessions/:sessionId/notes`

**WebSocket Events**:
- `session:emotion_update`
- `session:peer_connected`
- `session:peer_disconnected`

**Technology Stack**:
- **WebRTC**: PeerJS for P2P connection
- **Face Detection**: face-api.js for emotion detection
- **Signaling**: Socket.io for connection negotiation

**Component Implementation**:
```javascript
import Peer from 'peerjs';
import * as faceapi from 'face-api.js';

const VideoSession = ({ appointmentId }) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const [peerId, setPeerId] = useState(null);
  const [peers, setPeers] = useState({});
  const [emotionData, setEmotionData] = useState(null);
  
  const videoRef = useRef();
  const canvasRef = useRef();
  const peerRef = useRef();
  
  useEffect(() => {
    // Initialize PeerJS
    const peer = new Peer(undefined, {
      host: 'localhost',
      port: 3000,
      path: '/peerjs'
    });
    
    peer.on('open', (id) => {
      setPeerId(id);
      // Notify server of peer ID
      socket.emit('session:peer_joined', { peerId: id, appointmentId });
    });
    
    // Handle incoming calls
    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          call.answer(stream);
          displayRemoteStream(call.peerConnection);
        });
    });
    
    peerRef.current = peer;
    
    return () => peer.disconnect();
  }, []);
  
  // Real-time emotion detection
  useEffect(() => {
    const detectEmotions = async () => {
      if (!videoRef.current || !canvasRef.current) return;
      
      try {
        const detections = await faceapi
          .detectAllFaces(videoRef.current)
          .withFaceExpressions();
        
        const emotionScores = detections[0]?.expressions || {};
        
        // Send emotion data to server
        socket.emit('session:emotion_data', {
          sessionId: appointmentId,
          timestamp: new Date(),
          emotionDetection: emotionScores,
          confidence: 0.92
        });
        
        setEmotionData(emotionScores);
      } catch (error) {
        console.error('Emotion detection failed:', error);
      }
    };
    
    const interval = setInterval(detectEmotions, 2000);
    return () => clearInterval(interval);
  }, [appointmentId]);
  
  const handleEndSession = async () => {
    await dispatch(endVideoSession({
      sessionId: appointmentId,
      duration: sessionDuration
    }));
    navigate('/dashboard');
  };
  
  return (
    <div className="video-session">
      <video ref={videoRef} autoPlay />
      <canvas ref={canvasRef} />
      
      <div className="emotion-hud">
        <EmotionDisplay data={emotionData} />
      </div>
      
      <div className="session-controls">
        <button onClick={toggleVideo}>Video</button>
        <button onClick={toggleAudio}>Audio</button>
        <button onClick={handleEndSession}>End Session</button>
      </div>
    </div>
  );
};
```

---

### `SessionNotes.jsx`
**Purpose**: Doctor saves notes after session (Doctor only)

**APIs Used**:
- `POST /sessions/:sessionId/notes`

**Component**:
```javascript
const SessionNotes = ({ sessionId, patientId }) => {
  const [notes, setNotes] = useState('');
  const [prescription, setPrescription] = useState(null);
  const dispatch = useDispatch();
  
  const handleSaveNotes = async () => {
    await dispatch(saveSessionNotes({
      sessionId,
      notes,
      prescription,
      nextAppointment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }));
    
    showToast('Notes saved successfully');
  };
  
  return (
    <form onSubmit={handleSaveNotes}>
      <textarea 
        value={notes} 
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Session notes..."
      />
      <PrescriptionForm onChange={setPrescription} />
      <button type="submit">Save Notes</button>
    </form>
  );
};
```

---

# 5️⃣ COMMUNITY FEED FLOW

## Components

### `CommunityFeed.jsx`
**Purpose**: Real-time community posts feed

**APIs Used**:
- `GET /community/posts` (Initial load)
- WebSocket for real-time updates

**WebSocket Events**:
- `community:new_post`
- `community:new_comment`
- `community:post_reacted`

**State Management**:
```javascript
community: {
  posts: [{
    id, authorId, authorName, content, category,
    stats: { likes, comments, shares },
    createdAt, moderationStatus
  }],
  loading: boolean,
  pagination: { total, limit, offset, hasMore },
  filters: { category, sort }
}
```

**Real-Time Integration**:
```javascript
const CommunityFeed = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.community);
  const socket = useSocket();
  
  useEffect(() => {
    // Load initial posts
    dispatch(fetchCommunityPosts());
    
    // Subscribe to real-time updates
    socket.on('community:new_post', (newPost) => {
      dispatch(prependPost(newPost)); // Add to top
    });
    
    socket.on('community:new_comment', (comment) => {
      dispatch(updatePostCommentCount(comment.postId));
    });
    
    socket.on('community:post_reacted', (data) => {
      dispatch(updatePostReaction(data));
    });
    
    return () => {
      socket.off('community:new_post');
      socket.off('community:new_comment');
      socket.off('community:post_reacted');
    };
  }, []);
  
  const handleLoadMore = () => {
    dispatch(fetchMorePosts());
  };
  
  return (
    <div className="community-feed">
      <CreatePostModal />
      <FilterBar />
      
      <InfiniteScroll
        dataLength={posts.length}
        next={handleLoadMore}
        hasMore={pagination.hasMore}
        loader={<Spinner />}
      >
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
```

---

### `CreatePostModal.jsx`
**Purpose**: Create new community post

**APIs Used**:
- `POST /community/posts`

**Moderation Integration**:
```javascript
const CreatePostModal = () => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const dispatch = useDispatch();
  
  const handleSubmit = async () => {
    const result = await dispatch(createCommunityPost({
      content,
      category,
      isAnonymous,
      tags: extractTags(content)
    }));
    
    if (result.status === 'pending_moderation') {
      showToast('Post submitted for review');
    } else if (result.status === 'approved') {
      showToast('Post published!');
    }
  };
  
  return (
    <Modal>
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts..."
      />
      <Select 
        value={category} 
        onChange={setCategory}
        options={CATEGORIES}
      />
      <Checkbox 
        checked={isAnonymous}
        onChange={setIsAnonymous}
        label="Post anonymously"
      />
      <button onClick={handleSubmit}>Post</button>
    </Modal>
  );
};
```

---

### `PostCard.jsx`
**Purpose**: Display individual post with interactions

**APIs Used**:
- `POST /community/posts/:postId/comments`
- `POST /community/posts/:postId/react`
- `POST /community/posts/:postId/report`

**WebSocket Emissions**:
```javascript
const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const [showComments, setShowComments] = useState(false);
  
  const handleReact = (reaction) => {
    socket.emit('community:react', {
      postId: post.id,
      reaction
    });
    
    dispatch(optimisticReactionUpdate({
      postId: post.id,
      reaction
    }));
  };
  
  const handleAddComment = async (comment) => {
    const result = await dispatch(addComment({
      postId: post.id,
      content: comment
    }));
    
    // WebSocket broadcast handles real-time update
    socket.emit('community:comment_added', {
      postId: post.id,
      comment: result
    });
  };
  
  const handleReport = async (reason) => {
    await dispatch(reportPost({
      postId: post.id,
      reason
    }));
    showToast('Post reported');
  };
  
  return (
    <div className="post-card">
      <PostHeader post={post} onReport={handleReport} />
      <PostContent post={post} />
      
      <ReactionBar 
        stats={post.stats}
        onReact={handleReact}
      />
      
      {showComments && (
        <CommentsSection 
          postId={post.id}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};
```

---

# 6️⃣ VOCAL JOURNAL FLOW

## Components

### `VocalJournalRecorder.jsx`
**Purpose**: Record and analyze voice diary

**APIs Used**:
- `POST /journal/upload-audio`
- `GET /journal/entries/:entryId/analysis`

**Audio Recording**:
```javascript
const VocalJournalRecorder = () => {
  const mediaRecorderRef = useRef();
  const audioChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const dispatch = useDispatch();
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstart = () => setIsRecording(true);
      mediaRecorder.onstop = handleRecordingStop;
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      
      // Timer
      setRecordingTime(0);
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(interval);
    } catch (error) {
      showToast('Microphone access denied');
    }
  };
  
  const handleRecordingStop = async () => {
    setIsRecording(false);
    
    // Create audio blob
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    audioChunksRef.current = [];
    
    // Upload to backend
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('duration', recordingTime * 1000);
    
    const result = await dispatch(uploadVocalJournal(formData));
    
    if (result.success) {
      showToast('Recording uploaded. Analysis in progress...');
      
      // Poll for analysis results
      const analysisResult = await waitForAnalysis(result.entry.id);
      dispatch(setJournalAnalysis(analysisResult));
    }
  };
  
  return (
    <div className="vocal-recorder">
      <div className="timer">{formatTime(recordingTime)}</div>
      <button onClick={startRecording}>
        {isRecording ? 'Stop' : 'Record'}
      </button>
    </div>
  );
};
```

---

### `VocalAnalysisResults.jsx`
**Purpose**: Display vocal analysis with mood insights

**APIs Used**:
- `GET /journal/entries/:entryId/analysis`

**Component**:
```javascript
const VocalAnalysisResults = ({ entryId }) => {
  const analysis = useSelector(state => 
    state.journal.analyses.find(a => a.entryId === entryId)
  );
  
  if (!analysis) return <Spinner />;
  
  return (
    <div className="analysis-results">
      <h2>Your Voice Analysis</h2>
      
      <section className="mood-tags">
        <h3>Detected Mood</h3>
        {analysis.moodTags.map(tag => (
          <Badge key={tag.tag} label={tag.tag} confidence={tag.confidence} />
        ))}
      </section>
      
      <section className="biomarkers">
        <h3>Vocal Biomarkers</h3>
        <BiomarkerCard data={analysis.vocalBiomarkers} />
      </section>
      
      <section className="emotion-chart">
        <h3>Emotion Breakdown</h3>
        <EmotionPieChart data={analysis.emotionDetection} />
      </section>
      
      <section className="transcription">
        <h3>What You Said</h3>
        <p>{analysis.transcription}</p>
      </section>
      
      <section className="recommendations">
        {analysis.recommendations.map(rec => (
          <RecommendationCard key={rec.type} recommendation={rec} />
        ))}
      </section>
    </div>
  );
};
```

---

### `MoodCalendar.jsx`
**Purpose**: Heatmap calendar of mood tracking

**APIs Used**:
- `GET /journal/mood-calendar`
- `GET /dashboard/mood-calendar`

**Visualization**:
```javascript
const MoodCalendar = ({ month, year }) => {
  const calendarData = useSelector(state => state.dashboard.moodCalendar);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchMoodCalendar({ month, year }));
  }, [month, year]);
  
  const getColor = (mood, intensity) => {
    // GitHub contributions style heatmap
    const colorMap = {
      'calm': '#28a745',
      'neutral': '#fccc54',
      'anxious': '#ff9f43',
      'stressed': '#ee5a6f',
      'very_distressed': '#c0392b'
    };
    
    return colorMap[mood] || '#ddd';
  };
  
  return (
    <div className="mood-calendar">
      <h3>{new Date(year, month).toLocaleDateString()}</h3>
      
      <div className="calendar-grid">
        {calendarData.map(dayData => (
          <div
            key={dayData.date}
            className="calendar-cell"
            style={{ backgroundColor: getColor(dayData.mood, dayData.intensity) }}
            title={`${dayData.date}: ${dayData.mood}`}
          >
            {new Date(dayData.date).getDate()}
          </div>
        ))}
      </div>
      
      <MoodLegend />
    </div>
  );
};
```

---

# 7️⃣ GUARDIAN ACCESS FLOW

## Components

### `GuardianInvitation.jsx`
**Purpose**: Patient invites guardian

**APIs Used**:
- `POST /guardian/invite`

**Component**:
```javascript
const GuardianInvitation = () => {
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState('');
  const [permissions, setPermissions] = useState([]);
  const dispatch = useDispatch();
  
  const handleSendInvite = async () => {
    const result = await dispatch(sendGuardianInvite({
      email,
      relationship,
      permissions,
      expiresIn: 30 * 24 * 60 * 60 // 30 days
    }));
    
    if (result.success) {
      showToast(`Invitation sent to ${email}`);
    }
  };
  
  return (
    <form onSubmit={handleSendInvite}>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Guardian email"
      />
      
      <Select 
        value={relationship}
        onChange={setRelationship}
        options={['parent', 'sibling', 'spouse', 'caregiver']}
      />
      
      <PermissionsCheckbox 
        checked={permissions}
        onChange={setPermissions}
        options={[
          'mood_tracking',
          'appointment_logs',
          'prescriptions'
        ]}
      />
      
      <button type="submit">Send Invitation</button>
    </form>
  );
};
```

---

### `GuardianDashboard.jsx`
**Purpose**: Guardian views redacted patient data

**APIs Used**:
- `GET /guardian/permissions`
- `GET /guardian/patient-summary`

**Redaction Implementation**:
```javascript
const GuardianDashboard = ({ patientId }) => {
  const dispatch = useDispatch();
  const { permissions, patientSummary } = useSelector(state => state.guardian);
  
  useEffect(() => {
    dispatch(fetchGuardianPermissions());
    dispatch(fetchPatientSummary(patientId));
  }, [patientId]);
  
  // Check if guardian has permission
  const canView = (resource) => {
    return permissions.some(p => p.resource === resource && p.allowed);
  };
  
  return (
    <div className="guardian-dashboard">
      {canView('mood_tracking') && (
        <section>
          <h2>Mood Tracking</h2>
          <MoodChart data={patientSummary.moodTracking} />
        </section>
      )}
      
      {canView('appointment_logs') && (
        <section>
          <h2>Appointments</h2>
          <AppointmentsList appointments={patientSummary.appointments} />
        </section>
      )}
      
      {!canView('chat_logs') && (
        <section className="redacted">
          <p>🔒 Chat logs are private and redacted for your child's privacy</p>
        </section>
      )}
      
      {canView('prescriptions') && (
        <section>
          <h2>Medications</h2>
          <PrescriptionList medications={patientSummary.medications} />
        </section>
      )}
    </div>
  );
};
```

---

# 8️⃣ DASHBOARD & ANALYTICS FLOW

## Components

### `PatientDashboard.jsx`
**Purpose**: Main patient dashboard

**APIs Used**:
- `GET /dashboard/overview`
- `GET /dashboard/mood-calendar`
- `GET /dashboard/analytics`

**State Management**:
```javascript
dashboard: {
  overview: {
    nextAppointment, currentMoodStatus, quickStats
  },
  moodCalendar: [],
  analytics: {
    moodTrends, appointments, journalActivity
  },
  loading: boolean
}
```

**Component**:
```javascript
const PatientDashboard = () => {
  const dispatch = useDispatch();
  const { overview, moodCalendar } = useSelector(state => state.dashboard);
  
  useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);
  
  return (
    <div className="patient-dashboard">
      <Header greeting={`Welcome, ${overview.user.firstName}`} />
      
      <QuickStats stats={overview.quickStats} />
      
      <section className="next-appointment">
        <h2>Next Appointment</h2>
        <AppointmentCard appointment={overview.nextAppointment} />
        <JoinButton />
      </section>
      
      <section className="mood-status">
        <h2>Current Mood</h2>
        <MoodBadge mood={overview.currentMoodStatus} />
      </section>
      
      <section className="mood-calendar">
        <MoodCalendar data={moodCalendar} />
      </section>
      
      <section className="recommendations">
        <RecommendationsList recommendations={overview.recommendations} />
      </section>
    </div>
  );
};
```

---

### `DoctorDashboard.jsx`
**Purpose**: Doctor's patient and schedule management

**APIs Used**:
- `GET /dashboard/doctor`

**Component**:
```javascript
const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector(state => state.dashboard);
  
  useEffect(() => {
    dispatch(fetchDoctorDashboard());
    
    // Refresh every 30 seconds
    const interval = setInterval(
      () => dispatch(fetchDoctorDashboard()),
      30000
    );
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="doctor-dashboard">
      <h1>My Schedule</h1>
      
      <section className="today-schedule">
        <h2>Today</h2>
        {dashboard.todaySchedule.map(apt => (
          <AppointmentCard 
            key={apt.id} 
            appointment={apt}
            showJoinButton
          />
        ))}
      </section>
      
      <section className="patients">
        <h2>My Patients</h2>
        <PatientList patients={dashboard.patients} />
      </section>
      
      <section className="stats">
        <StatsCard stat="Total Patients" value={dashboard.stats.totalPatients} />
        <StatsCard stat="Sessions This Month" value={dashboard.stats.completedSessionsThisMonth} />
      </section>
    </div>
  );
};
```

---

# 9️⃣ RELAXATION HUB FLOW

## Components

### `RelaxationHub.jsx`
**Purpose**: Relaxation activities library

**APIs Used**:
- `GET /relaxation/activities`

**Component**:
```javascript
const RelaxationHub = () => {
  const [category, setCategory] = useState('breathing');
  const dispatch = useDispatch();
  const activities = useSelector(state => state.relaxation.activities);
  
  useEffect(() => {
    dispatch(fetchActivities({ category }));
  }, [category]);
  
  return (
    <div className="relaxation-hub">
      <h1>Take a Break</h1>
      
      <CategoryTabs 
        current={category}
        onChange={setCategory}
        categories={['breathing', 'meditation', 'music', 'sleep']}
      />
      
      <ActivityGrid 
        activities={activities}
        onSelect={handleStartActivity}
      />
    </div>
  );
};
```

---

### `ActivityPlayer.jsx`
**Purpose**: Play relaxation activity

**APIs Used**:
- `POST /relaxation/activities/:activityId/start`
- `POST /relaxation/activities/:sessionId/complete`

**Component**:
```javascript
const ActivityPlayer = ({ activityId }) => {
  const dispatch = useDispatch();
  const activity = useSelector(state => 
    state.relaxation.activities.find(a => a.id === activityId)
  );
  
  const handleStart = async () => {
    const session = await dispatch(startActivity(activityId));
    playAudio(session.audioStream);
  };
  
  const handleComplete = async () => {
    await dispatch(completeActivity({
      sessionId: activity.sessionId,
      rating: userRating,
      moodBefore: 'anxious',
      moodAfter: 'calm'
    }));
    
    showMoodImprovement();
  };
  
  return (
    <div className="activity-player">
      <h2>{activity.title}</h2>
      <InstructionsList instructions={activity.instructions} />
      <AudioPlayer onComplete={handleComplete} />
      <RatingForm onSubmit={handleComplete} />
    </div>
  );
};
```

---

# 🔟 REDUX STORE STRUCTURE

```javascript
// store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import triageSlice from './slices/triageSlice';
import bookingSlice from './slices/bookingSlice';
import sessionSlice from './slices/sessionSlice';
import communitySlice from './slices/communitySlice';
import journalSlice from './slices/journalSlice';
import guardianSlice from './slices/guardianSlice';
import dashboardSlice from './slices/dashboardSlice';
import relaxationSlice from './slices/relaxationSlice';

export const rootReducer = combineReducers({
  auth: authSlice,
  triage: triageSlice,
  booking: bookingSlice,
  session: sessionSlice,
  community: communitySlice,
  journal: journalSlice,
  guardian: guardianSlice,
  dashboard: dashboardSlice,
  relaxation: relaxationSlice
});
```

---

# 1️⃣1️⃣ API SERVICE LAYER

**Pattern**: Axios instance with JWT interceptor

```javascript
// services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
});

// Request interceptor: Add JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: Handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try refresh
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const response = await axios.post('/auth/refresh-token', {
          refreshToken
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        
        // Retry original request
        return apiClient(error.config);
      } catch (refreshError) {
        // Redirect to login
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

# 1️⃣2️⃣ WEBSOCKET INITIALIZATION

```javascript
// services/socketService.js
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL, {
  auth: {
    token: localStorage.getItem('accessToken')
  },
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

socket.on('connect', () => {
  console.log('Connected to WebSocket');
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});

export default socket;
```

---

# 1️⃣3️⃣ COMPONENT COMMUNICATION MAP

```
App
├── Auth Routes
│   ├── LoginForm → authService → /auth/login
│   ├── RegisterForm → authService → /auth/register
│   └── EmailVerification → authService → /auth/verify-email
│
├── Main App (Protected)
│   ├── Navigation
│   ├── PatientDashboard
│   │   ├── QuickStats (Redux dashboardSlice)
│   │   ├── MoodCalendar (Redux journalSlice)
│   │   └── RecommendationsList
│   │
│   ├── Triage Flow
│   │   ├── TriageChat ←→ WebSocket (triage:send_message)
│   │   └── CrisisProtocol (Emergency handling)
│   │
│   ├── Booking Flow
│   │   ├── DoctorBrowser → /appointments/doctors
│   │   ├── DoctorDetail → /appointments/doctors/:id/slots
│   │   ├── BookingForm → POST /appointments/book
│   │   └── AppointmentsList → GET /appointments
│   │
│   ├── Video Session
│   │   ├── VideoSession ←→ WebRTC + /sessions/start
│   │   └── SessionNotes → POST /sessions/:id/notes
│   │
│   ├── Community
│   │   ├── CommunityFeed ←→ WebSocket (community:*)
│   │   ├── CreatePostModal → POST /community/posts
│   │   └── PostCard ← real-time updates
│   │
│   ├── Vocal Journal
│   │   ├── VocalJournalRecorder → POST /journal/upload-audio
│   │   ├── VocalAnalysisResults ← GET /journal/analysis
│   │   └── MoodCalendar ← GET /journal/mood-calendar
│   │
│   ├── Guardian
│   │   ├── GuardianInvitation → POST /guardian/invite
│   │   └── GuardianDashboard → GET /guardian/patient-summary
│   │
│   └── Relaxation Hub
│       ├── RelaxationHub → GET /relaxation/activities
│       └── ActivityPlayer → POST /relaxation/start
```

---

**Last Updated**: December 25, 2025
**Version**: 1.0.0

This integration guide covers all major flows. For specific API details, refer to API_DOCUMENTATION.md.
