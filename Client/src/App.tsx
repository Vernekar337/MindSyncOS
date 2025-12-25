import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Triage from "./pages/Triage"; // <--- Import this

// Placeholder components for pages we haven't built yet
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-10 text-center text-text-muted">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p>This module is under development.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="triage" element={<Triage />} />{" "}
          {/* <--- Update this line */}
          <Route
            path="sessions"
            element={<Placeholder title="Video Sessions" />}
          />
          <Route
            path="community"
            element={<Placeholder title="Community Feed" />}
          />
          <Route
            path="journal"
            element={<Placeholder title="Vocal Journal" />}
          />
          <Route
            path="relaxation"
            element={<Placeholder title="Relaxation Hub" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
