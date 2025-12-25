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
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: MessageSquare, label: "AI Triage", path: "/triage" },
    { icon: Video, label: "Sessions", path: "/sessions" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: BookOpen, label: "Journal", path: "/journal" },
    { icon: Coffee, label: "Relaxation", path: "/relaxation" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 hidden md:flex flex-col z-10">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">M</span>
        </div>
        <span className="text-xl font-bold text-text-main">MindSync OS</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary-light text-primary font-medium"
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
