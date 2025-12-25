import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

// Patient Pages
import Dashboard from "./pages/Dashboard";
import Triage from "./pages/Triage";
import Appointments from "./pages/Appointments";
import Sessions from "./pages/Sessions";
import Community from "./pages/Community";
import Journal from "./pages/Journal";
import Relaxation from "./pages/Relaxation";

// Doctor Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";

// Guardian Pages
import GuardianDashboard from "./pages/guardian/GuardianDashboard";
import SafetyAlerts from "./pages/guardian/SafetyAlerts";
import CareSchedule from "./pages/guardian/CareSchedule";

// Auth Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// --- ROLE BASED ROUTE HELPERS ---

// 1. Home Route: Decides which Dashboard to show
const HomeRoute = () => {
  const user = JSON.parse(localStorage.getItem("mindSyncUser") || "{}");
  if (user.role === "Doctor") return <DoctorDashboard />;
  if (user.role === "Guardian") return <GuardianDashboard />;
  return <Dashboard />; // Default to Patient
};

// 2. Schedule Route: Decides which Schedule view to show
const ScheduleRoute = () => {
  const user = JSON.parse(localStorage.getItem("mindSyncUser") || "{}");
  if (user.role === "Guardian") return <CareSchedule />;
  // Fallback for Doctor (Placeholder for now)
  return <div className="p-10 text-center">Schedule Manager (Coming Soon)</div>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* --- Protected Routes (Inside Sidebar Layout) --- */}
        <Route path="/" element={<MainLayout />}>
          {/* Smart Home (Dashboard) */}
          <Route index element={<HomeRoute />} />

          {/* Standard Patient Features */}
          <Route path="triage" element={<Triage />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="community" element={<Community />} />
          <Route path="journal" element={<Journal />} />
          <Route path="relaxation" element={<Relaxation />} />

          {/* Shared / Dynamic Routes */}
          <Route path="schedule" element={<ScheduleRoute />} />

          {/* Guardian Specific */}
          <Route path="alerts" element={<SafetyAlerts />} />

          {/* Doctor Specific (Placeholders) */}
          <Route
            path="patients"
            element={
              <div className="p-10 text-center">Patient List (Coming Soon)</div>
            }
          />
          <Route
            path="analytics"
            element={
              <div className="p-10 text-center">Analytics (Coming Soon)</div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
