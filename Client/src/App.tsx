import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { ToastProvider } from "./context/ToastContext";

// Patient Pages
import Dashboard from "./pages/Dashboard";
import Triage from "./pages/Triage";
import Appointments from "./pages/Appointments";
import DoctorProfile from "./pages/DoctorProfile";
import Sessions from "./pages/Sessions";
import Community from "./pages/Community";
import Journal from "./pages/Journal";
import Relaxation from "./pages/Relaxation";

// Doctor Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import CrisisEvents from "./pages/doctor/CrisisEvents";
import Patients from "./pages/doctor/Patients";
import PatientDetail from "./pages/doctor/PatientDetail";
import DoctorSchedule from "./pages/doctor/DoctorSchedule"; // <--- ADDED (Step 11)

// Admin Pages
import Moderation from "./pages/admin/Moderation"; // <--- ADDED (Step 11)

// Guardian Pages
import GuardianDashboard from "./pages/guardian/GuardianDashboard";
import SafetyAlerts from "./pages/guardian/SafetyAlerts";
import CareSchedule from "./pages/guardian/CareSchedule";

// Auth Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// --- ROLE BASED ROUTE HELPERS ---

const getUser = () => {
  try {
    const userStr = localStorage.getItem("mindSyncUser");
    return userStr ? JSON.parse(userStr) : {};
  } catch (e) {
    return {};
  }
};

const HomeRoute = () => {
  const user = getUser();
  if (user.role === "Doctor") return <DoctorDashboard />;
  if (user.role === "Guardian") return <GuardianDashboard />;
  return <Dashboard />;
};

// Updated Schedule Route to handle Doctor View
const ScheduleRoute = () => {
  const user = getUser();
  if (user.role === "Guardian") return <CareSchedule />;
  if (user.role === "Doctor") return <DoctorSchedule />; // <--- NOW CONNECTED

  // Fallback for Patient (if they access /schedule directly)
  return (
    <div className="p-10 text-center">
      Patient Schedule is inside Appointments.
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomeRoute />} />

            {/* Patient Features */}
            <Route path="triage" element={<Triage />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="appointments/:id" element={<DoctorProfile />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="community" element={<Community />} />
            <Route path="journal" element={<Journal />} />
            <Route path="relaxation" element={<Relaxation />} />

            {/* Shared */}
            <Route path="schedule" element={<ScheduleRoute />} />

            {/* Guardian */}
            <Route path="alerts" element={<SafetyAlerts />} />

            {/* Doctor & Admin Features */}
            <Route path="crisis-events" element={<CrisisEvents />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientDetail />} />

            {/* Added Moderation Route (Accessible by Doctors/Admins) */}
            <Route path="moderation" element={<Moderation />} />

            <Route
              path="analytics"
              element={
                <div className="p-10 text-center">Analytics (Coming Soon)</div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
