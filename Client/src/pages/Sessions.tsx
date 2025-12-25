import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Whiteboard } from "../components/Whiteboard"; // Import Whiteboard
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  MonitorUp,
  Flag,
  PenTool,
  Layout,
  Activity,
  FileText,
} from "lucide-react";

const Sessions = () => {
  // Mock User Role
  const user = JSON.parse(localStorage.getItem("mindSyncUser") || "{}");
  const isDoctor = user.role === "Doctor";

  // State
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "emotions" | "notes" | "whiteboard"
  >("emotions");
  const [stressLevel, setStressLevel] = useState(30);

  // Simulate Stress Level Fluctuation for "Live Emotions"
  useEffect(() => {
    const interval = setInterval(() => {
      setStressLevel((prev) =>
        Math.min(100, Math.max(10, prev + (Math.random() * 20 - 10)))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col animate-in fade-in duration-500">
      {/* MAIN CONTENT GRID */}
      <div className="flex-1 flex gap-4 overflow-hidden pb-20">
        {/* 1. MAIN VIDEO AREA */}
        <div className="flex-1 bg-gray-900 rounded-2xl relative overflow-hidden shadow-2xl group">
          {/* Remote Video (Mock) */}
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
            className="w-full h-full object-cover opacity-90"
            alt="Remote Participant"
          />

          {/* Emotion HUD Overlay (Discreet) */}
          <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-3">
            <span className="text-2xl">🤔</span>
            <div>
              <p className="text-white text-sm font-bold leading-none">
                Contemplative
              </p>
              <p className="text-gray-300 text-[10px]">Dominant Emotion</p>
            </div>
            <div className="h-8 w-px bg-white/20 mx-1"></div>
            <div className="flex flex-col justify-center w-24">
              <div className="flex justify-between text-[10px] text-gray-300 mb-0.5">
                <span>Stress</span>
                <span>{Math.round(stressLevel)}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    stressLevel > 70 ? "bg-amber-500" : "bg-teal-400"
                  }`}
                  style={{ width: `${stressLevel}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Local Video (Bottom Right) */}
          <div className="absolute bottom-6 right-6 w-48 h-36 bg-gray-800 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300"
              className="w-full h-full object-cover"
              alt="Me"
            />
            {isMuted && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <MicOff className="text-red-500" />
              </div>
            )}
          </div>
        </div>

        {/* 2. RIGHT PANEL (Doctor View) */}
        {isDoctor && (
          <div className="w-96 bg-white rounded-2xl border border-gray-200 flex flex-col shadow-xl overflow-hidden">
            {/* Patient Info Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-900">Alex Johnson</h3>
              <p className="text-xs text-gray-500">
                Last Session: Oct 22 • Anxiety Care
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("emotions")}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "emotions"
                    ? "border-secondary text-secondary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Live Emotions
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "notes"
                    ? "border-secondary text-secondary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Notes
              </button>
              <button
                onClick={() => setActiveTab("whiteboard")}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "whiteboard"
                    ? "border-secondary text-secondary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Whiteboard
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-4 bg-gray-50/30 overflow-hidden flex flex-col">
              {/* A. Live Emotions Tab */}
              {activeTab === "emotions" && (
                <div className="space-y-6 animate-in fade-in">
                  <Card>
                    <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                      <Activity size={16} className="text-secondary" />{" "}
                      Real-time Analysis
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Anxiety Level</span>
                          <span className="font-bold text-amber-600">
                            Medium
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 w-[45%]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Engagement</span>
                          <span className="font-bold text-green-600">High</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-[85%]"></div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <h4 className="font-bold text-sm mb-2 text-gray-700">
                      Detected Cues
                    </h4>
                    <div className="space-y-2">
                      <div className="text-xs p-2 bg-white border border-gray-100 rounded flex gap-2 items-center">
                        <span className="text-lg">😟</span>
                        <span className="text-gray-600">
                          Furrowed brow detected at 10:04
                        </span>
                      </div>
                      <div className="text-xs p-2 bg-white border border-gray-100 rounded flex gap-2 items-center">
                        <span className="text-lg">🗣️</span>
                        <span className="text-gray-600">
                          Rapid speech pattern detected
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* B. Notes Tab */}
              {activeTab === "notes" && (
                <div className="h-full animate-in fade-in flex flex-col">
                  <textarea
                    className="flex-1 w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                    placeholder="Type session notes here..."
                    defaultValue="Patient reports sleeping better. Mentioned stress at work regarding upcoming deadline."
                  />
                  <div className="mt-2 text-xs text-gray-400 text-right">
                    Saved just now
                  </div>
                </div>
              )}

              {/* C. Whiteboard Tab */}
              {activeTab === "whiteboard" && (
                <div className="h-full animate-in fade-in">
                  <Whiteboard />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. CONTROLS BAR (Bottom) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl px-6 py-3 flex items-center gap-4 z-50">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-3 rounded-full transition-all ${
            isMuted
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <button
          onClick={() => setIsCameraOff(!isCameraOff)}
          className={`p-3 rounded-full transition-all ${
            isCameraOff
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          {isCameraOff ? <VideoOff size={20} /> : <VideoIcon size={20} />}
        </button>

        <div className="w-px h-8 bg-gray-300 mx-2"></div>

        <button
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
          title="Screen Share"
        >
          <MonitorUp size={20} />
        </button>

        {/* Mark Moment Button */}
        <button className="flex items-center gap-2 px-4 py-3 bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-full font-medium transition-colors">
          <Flag size={18} />
          <span className="hidden sm:inline">Mark Moment</span>
        </button>

        {isDoctor && (
          <button
            onClick={() => setActiveTab("whiteboard")}
            className={`p-3 rounded-full transition-all ${
              activeTab === "whiteboard"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            title="Toggle Whiteboard"
          >
            <PenTool size={20} />
          </button>
        )}

        <div className="w-px h-8 bg-gray-300 mx-2"></div>

        {/* End Call Button */}
        <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold shadow-lg shadow-red-500/30 transition-all flex items-center gap-2">
          <PhoneOff size={20} />
          <span className="hidden sm:inline">End Call</span>
        </button>
      </div>
    </div>
  );
};

export default Sessions;
