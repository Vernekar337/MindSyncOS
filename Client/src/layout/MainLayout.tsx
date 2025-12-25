import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Bell } from "lucide-react";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="md:ml-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-semibold text-text-main">
              Welcome back, User
            </h2>
            <p className="text-xs text-text-muted">
              Hope you're having a calm day.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full text-text-muted relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center text-primary font-medium">
              U
            </div>
          </div>
        </header>
        {/* Page Content */}
        <div className="p-8 flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
