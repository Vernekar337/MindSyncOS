import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Video,
  Users,
  BookOpen,
  Coffee,
  Settings,
  Calendar,
  Activity,
  ShieldCheck, // Icon for Guardian
} from "lucide-react";

const Sidebar = () => {
  // 1. Get User Role from Storage
  const user = JSON.parse(localStorage.getItem("mindSyncUser") || "{}");
  const isDoctor = user.role === "Doctor";
  const isGuardian = user.role === "Guardian";

  // 2. Define Menus based on Role
  const patientNav = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: MessageSquare, label: "AI Triage", path: "/triage" },
    { icon: Calendar, label: "Appointments", path: "/appointments" },
    { icon: Video, label: "Sessions", path: "/sessions" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: BookOpen, label: "Journal", path: "/journal" },
    { icon: Coffee, label: "Relaxation", path: "/relaxation" },
  ];

  const doctorNav = [
    { icon: LayoutDashboard, label: "Overview", path: "/" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: Users, label: "My Patients", path: "/patients" },
    { icon: Video, label: "Live Sessions", path: "/sessions" },
    { icon: Activity, label: "Analytics", path: "/analytics" },
    { icon: Users, label: "Community", path: "/community" },
  ];

  const guardianNav = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Calendar, label: "Care Schedule", path: "/schedule" }, // View only
    { icon: ShieldCheck, label: "Safety Alerts", path: "/alerts" }, // Placeholder
    { icon: Settings, label: "Privacy Settings", path: "/settings" },
  ];

  // 3. Choose which menu to show
  let navItems = patientNav;
  if (isDoctor) navItems = doctorNav;
  if (isGuardian) navItems = guardianNav;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 hidden md:flex flex-col z-10 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        {/* Logo changes color for Role */}
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isDoctor
              ? "bg-secondary"
              : isGuardian
              ? "bg-blue-600"
              : "bg-primary"
          }`}
        >
          <span className="text-white font-bold">M</span>
        </div>
        <div>
          <span className="text-xl font-bold text-text-main block leading-none">
            MindSync
          </span>
          <span className="text-[10px] text-text-muted font-bold tracking-widest uppercase">
            {isDoctor ? "Professional" : isGuardian ? "Guardian" : "OS"}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? isDoctor
                    ? "bg-secondary text-white shadow-md shadow-secondary/20"
                    : isGuardian
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-primary-light text-primary font-medium"
                  : "text-text-muted hover:bg-gray-50 hover:text-text-main"
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 text-text-muted hover:text-text-main transition-colors"
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
