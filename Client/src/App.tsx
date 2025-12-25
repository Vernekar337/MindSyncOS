import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Triage from "./pages/Triage";
import Appointments from "./pages/Appointments";
import Sessions from "./pages/Sessions";
import Community from "./pages/Community";
import Journal from "./pages/Journal";
import Relaxation from "./pages/Relaxation";
import Login from "./pages/Login"; // <--- Import
import Signup from "./pages/Signup"; // <--- Import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (No Sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes (With Sidebar) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="triage" element={<Triage />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="community" element={<Community />} />
          <Route path="journal" element={<Journal />} />
          <Route path="relaxation" element={<Relaxation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
