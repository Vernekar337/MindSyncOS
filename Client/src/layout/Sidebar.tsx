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
  ShieldCheck,
  ClipboardList,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string; // <--- New Prop
}

const Sidebar = ({ isOpen, onClose, userRole }: SidebarProps) => {
  const isDoctor = userRole === "Doctor";
  const isGuardian = userRole === "Guardian";

  const patientNav = [
    { icon: LayoutDashboard, label: "Home / Dashboard", path: "/" },
    { icon: MessageSquare, label: "AI Triage", path: "/triage" },
    { icon: Calendar, label: "Appointments", path: "/appointments" },
    { icon: Video, label: "Video Sessions", path: "/sessions" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: BookOpen, label: "Journal", path: "/journal" },
    { icon: Coffee, label: "Relaxation", path: "/relaxation" },
  ];

  const doctorNav = [
    { icon: LayoutDashboard, label: "Doctor Dashboard", path: "/" },
    { icon: Calendar, label: "My Appointments", path: "/schedule" },
    { icon: Video, label: "Live Sessions", path: "/sessions" },
    { icon: ClipboardList, label: "Patients", path: "/patients" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: Activity, label: "Analytics", path: "/analytics" },
  ];

  const guardianNav = [
    { icon: LayoutDashboard, label: "Guardian Dashboard", path: "/" },
    { icon: Calendar, label: "Care Schedule", path: "/schedule" },
    { icon: ShieldCheck, label: "Safety Alerts", path: "/alerts" },
    { icon: Settings, label: "Privacy Settings", path: "/settings" },
  ];

  let navItems = patientNav;
  if (isDoctor) navItems = doctorNav;
  if (isGuardian) navItems = guardianNav;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden animate-in fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand Header */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
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

          <button
            onClick={onClose}
            className="md:hidden text-text-muted hover:text-text-main"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group relative ${
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
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Settings */}
        <div className="p-4 border-t border-gray-100">
          <NavLink
            to="/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-text-muted hover:text-text-main transition-colors"
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
