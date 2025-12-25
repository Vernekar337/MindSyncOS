import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  Lock,
  Activity,
  Calendar,
  Pill,
  AlertTriangle,
  Phone,
  UserX,
  TrendingUp,
} from "lucide-react";

const GuardianDashboard = () => {
  const [showStopAccessModal, setShowStopAccessModal] = useState(false);

  // Mock Patient Data
  const patientName = "Alex Johnson";
  const relationship = "Parent";

  // Mock Mood Trend (Last 14 days)
  const moodTrend = [60, 65, 55, 40, 45, 70, 75, 80, 70, 60, 50, 65, 80, 85];

  const handleStopAccess = () => {
    // Logic to revoke access would go here
    alert("Access revoked. Redirecting...");
    localStorage.removeItem("mindSyncUser");
    window.location.href = "/login";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. TOP SECTION: Info Strip */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {patientName[0]}
          </div>
          <div>
            <h1 className="text-lg font-bold text-text-main">
              Viewing: {patientName}
            </h1>
            <p className="text-sm text-text-muted">
              Relationship:{" "}
              <span className="font-medium text-gray-700">{relationship}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-700 font-medium bg-white px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
          <Lock size={12} /> Some details are hidden to respect their privacy.
        </div>
      </div>

      {/* 2. WELLBEING CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* A. Mood Trend Chart */}
        <Card className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-secondary" /> Mood Trend
            </h3>
            <span className="text-xs text-gray-500">Past 14 Days</span>
          </div>
          <div className="flex-1 flex items-end justify-between gap-1 h-32 px-2">
            {moodTrend.map((val, i) => (
              <div
                key={i}
                className="w-full bg-secondary/20 rounded-t-sm relative group"
              >
                <div
                  className="absolute bottom-0 left-0 right-0 bg-secondary rounded-t-sm transition-all hover:bg-secondary-hover"
                  style={{ height: `${val}%` }}
                ></div>
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-10">
                  {val}% Positive
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            Generally positive trend this week.
          </p>
        </Card>

        {/* B. Appointments Overview */}
        <Card>
          <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-primary" /> Care Schedule
          </h3>
          <div className="space-y-4">
            {/* Past */}
            <div className="opacity-60">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                Last Session
              </p>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <span className="block font-bold text-sm text-gray-700">
                    Dr. Sarah Mitchell
                  </span>
                  <span className="text-xs text-gray-500">
                    Therapy Check-in
                  </span>
                </div>
                <span className="text-xs font-medium text-gray-400">
                  Oct 22
                </span>
              </div>
            </div>
            {/* Upcoming */}
            <div>
              <p className="text-xs font-bold text-primary uppercase mb-1">
                Upcoming
              </p>
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                <div>
                  <span className="block font-bold text-sm text-gray-900">
                    Dr. Sarah Mitchell
                  </span>
                  <span className="text-xs text-primary">Video Session</span>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-gray-900">
                    Tomorrow
                  </span>
                  <span className="text-xs text-gray-500">4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* C. Medications Card */}
        <Card>
          <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Pill size={18} className="text-green-500" /> Medications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-xs">
                  Rx
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800">Sertraline</p>
                  <p className="text-xs text-gray-500">50mg • Morning</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                  S
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800">Melatonin</p>
                  <p className="text-xs text-gray-500">3mg • Before Bed</p>
                </div>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-bold">
                As needed
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* 3. REDACTED AREAS (Privacy UX) */}
      <h2 className="text-lg font-bold text-gray-900 pt-4">Private Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chat Logs Redacted */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-3">
            <Lock size={24} />
          </div>
          <h3 className="font-bold text-gray-700 mb-1">Session Logs & Chats</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Conversations are private between {patientName} and their therapist
            to ensure honest communication.
          </p>
        </div>

        {/* Journal Redacted */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-3">
            <Lock size={24} />
          </div>
          <h3 className="font-bold text-gray-700 mb-1">Journal Entries</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Personal reflections are private. You will only be notified if AI
            detects a safety risk.
          </p>
        </div>
      </div>

      {/* 4. ACTIONS */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 border-gray-300"
        >
          <Phone size={16} /> Contact Care Team
        </Button>

        <button
          onClick={() => setShowStopAccessModal(true)}
          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
        >
          <UserX size={16} /> Stop Access
        </button>
      </div>

      {/* Confirmation Modal */}
      {showStopAccessModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">
              Stop Monitoring Access?
            </h3>
            <p className="text-center text-gray-500 mb-6">
              You are about to remove your guardian access to{" "}
              <strong>{patientName}</strong>'s profile. You will no longer
              receive safety alerts.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowStopAccessModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                onClick={handleStopAccess}
              >
                Confirm Stop
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardianDashboard;
