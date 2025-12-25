import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Triage from "./pages/Triage";
import Sessions from "./pages/Sessions";
import Community from "./pages/Community";
import Journal from "./pages/Journal";
import Relaxation from "./pages/Relaxation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* 1. Dashboard */}
          <Route index element={<Dashboard />} />

          {/* 2. AI Triage */}
          <Route path="triage" element={<Triage />} />

          {/* 3. Video Sessions */}
          <Route path="sessions" element={<Sessions />} />

          {/* 4. Community Feed */}
          <Route path="community" element={<Community />} />

          {/* 5. Vocal Journal */}
          <Route path="journal" element={<Journal />} />

          {/* 6. Relaxation Hub */}
          <Route path="relaxation" element={<Relaxation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
