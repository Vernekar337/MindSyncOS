import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Video,
  Users,
  Calendar,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

interface MobileNavProps {
  userRole: string;
}

const MobileNav = ({ userRole }: MobileNavProps) => {
  const patientTabs = [
    { icon: LayoutDashboard, label: "Home", path: "/" },
    { icon: MessageSquare, label: "Triage", path: "/triage" },
    { icon: Video, label: "Sessions", path: "/sessions" },
    { icon: BookOpen, label: "Journal", path: "/journal" },
    { icon: Users, label: "Community", path: "/community" },
  ];

  const doctorTabs = [
    { icon: LayoutDashboard, label: "Home", path: "/" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: Users, label: "Patients", path: "/patients" },
    { icon: Video, label: "Sessions", path: "/sessions" },
  ];

  const guardianTabs = [
    { icon: LayoutDashboard, label: "Home", path: "/" },
    { icon: Calendar, label: "Care", path: "/schedule" },
    { icon: ShieldCheck, label: "Alerts", path: "/alerts" },
  ];

  let tabs = patientTabs;
  if (userRole === "Doctor") tabs = doctorTabs;
  if (userRole === "Guardian") tabs = guardianTabs;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 px-4 z-50 flex items-center justify-around pb-safe">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? "text-primary" : "text-text-muted hover:text-text-main"
            }`
          }
        >
          {/* FIX: We must wrap the children in a function to access 'isActive' here too */}
          {({ isActive }) => (
            <>
              <tab.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default MobileNav;
