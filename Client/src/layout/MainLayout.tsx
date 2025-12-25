import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Bell, LogOut } from "lucide-react";

const MainLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);

  // AUTH PROTECTION CHECK
  useEffect(() => {
    const storedUser = localStorage.getItem("mindSyncUser");
    if (!storedUser) {
      // If no user found, kick them to login
      navigate("/login");
    } else {
      // If user found, load their data
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("mindSyncUser"); // Clear session
    navigate("/login"); // Redirect to login
  };

  // Prevent flashing of dashboard if not logged in
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen flex flex-col transition-all duration-300">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-text-main">
              Welcome back, {user.name}
            </h2>
            <p className="text-xs text-text-muted">
              Hope you're having a calm day.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full text-text-muted relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></span>
            </button>

            <div className="h-8 w-px bg-gray-200 mx-1"></div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary-light rounded-full flex items-center justify-center text-primary font-bold border border-primary/20">
                {user.name[0]}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-red-500 transition-colors px-3 py-1.5 hover:bg-red-50 rounded-lg"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 flex-1 overflow-auto animate-in fade-in duration-500">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
