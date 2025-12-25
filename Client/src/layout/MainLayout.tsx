import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { Bell, LogOut, Menu } from "lucide-react"; // <--- Import Menu icon

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  // NEW: State for Mobile Drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("mindSyncUser");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("mindSyncUser");
    navigate("/login");
  };

  if (!user) return null;

  const getPageTitle = (path: string) => {
    if (path === "/") return "Dashboard";
    if (path.includes("triage")) return "AI Triage";
    if (path.includes("sessions")) return "Video Sessions";
    if (path.includes("community")) return "Community Feed";
    if (path.includes("journal")) return "Vocal Journal";
    if (path.includes("schedule")) return "Schedule";
    return "MindSync OS";
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* 1. Sidebar (Desktop Fixed / Mobile Drawer) */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* 2. Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300 relative pb-16 md:pb-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 shadow-sm">
          {/* Left: Menu Button (Mobile) + Title */}
          <div className="flex items-center gap-3">
            {/* Mobile: Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-text-main hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-text-main md:hidden">
                MindSync
              </h1>
              <h2 className="hidden md:block text-lg font-semibold text-text-main">
                {getPageTitle(location.pathname)}
              </h2>
            </div>
          </div>

          {/* Right Section (Keep existing code) */}
          <div className="flex items-center gap-3 md:gap-4">
            <span className="hidden md:inline-block px-2 py-0.5 bg-gray-100 text-xs font-bold text-text-muted uppercase rounded-full tracking-wider">
              {user.role}
            </span>

            <button className="p-2 hover:bg-gray-100 rounded-full text-text-muted relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></span>
            </button>

            <div className="h-8 w-px bg-gray-200 mx-1 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-9 md:h-9 bg-primary-light rounded-full flex items-center justify-center text-primary font-bold border border-primary/20 cursor-pointer">
                {user.name[0]}
              </div>

              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 text-sm font-medium text-text-muted hover:text-red-500 transition-colors px-3 py-1.5 hover:bg-red-50 rounded-lg"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-8 flex-1 overflow-auto animate-page">
          <Outlet />
        </div>

        {/* Mobile Nav */}
        <MobileNav />
      </main>
    </div>
  );
};

export default MainLayout;
