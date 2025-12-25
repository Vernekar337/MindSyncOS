import React, { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { BreathingExercise } from "../components/BreathingExercise"; // Import Component
import {
  Wind,
  Music,
  Headphones,
  CloudRain,
  Play,
  Clock,
  Star,
} from "lucide-react";

const Relaxation = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  const exercises = [
    {
      id: "breathing-478",
      title: "4-7-8 Breathing",
      type: "Breathing",
      duration: "5 min",
      mode: "Guided",
      icon: Wind,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      id: "box-breathing",
      title: "Box Breathing",
      type: "Breathing",
      duration: "3 min",
      mode: "Self-paced",
      icon: Wind,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: "body-scan",
      title: "Body Scan",
      type: "Meditation",
      duration: "10 min",
      mode: "Audio Guide",
      icon: Headphones,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      id: "rain-sounds",
      title: "Rainy Mood",
      type: "Soundscape",
      duration: "Infinite",
      mode: "Background",
      icon: CloudRain,
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
    {
      id: "lofi-beats",
      title: "Calm Lo-Fi",
      type: "Soundscape",
      duration: "Infinite",
      mode: "Music",
      icon: Music,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  // Logic to launch full-screen exercise
  if (activeExercise === "breathing-478") {
    return <BreathingExercise onClose={() => setActiveExercise(null)} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* 1. Hero Section */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h1 className="text-3xl font-bold mb-2">
            Take a few minutes to reset.
          </h1>
          <p className="text-teal-50 text-lg opacity-90 mb-6">
            Feeling overwhelmed? A simple breathing exercise can lower your
            cortisol in just 60 seconds.
          </p>
          <Button
            className="bg-white text-teal-600 hover:bg-teal-50 border-0"
            onClick={() => setActiveExercise("breathing-478")}
          >
            <Play size={18} className="mr-2" /> Start Breathing Now
          </Button>
        </div>

        {/* Background Decor */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-teal-300/20 rounded-full blur-2xl"></div>
      </div>

      {/* 2. Categories & Cards */}
      <div>
        <h2 className="text-xl font-bold text-text-main mb-4">
          Quick Relief Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map((item) => (
            <Card
              key={item.id}
              className="hover:shadow-lg transition-all cursor-pointer group border-transparent hover:border-primary/20"
              onClick={() => setActiveExercise(item.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}
                >
                  <item.icon size={24} />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-text-muted bg-gray-50 px-2 py-1 rounded-full">
                  {item.mode === "Guided" && (
                    <Star size={10} className="text-amber-500 fill-amber-500" />
                  )}
                  {item.mode}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-text-main text-lg mb-1">
                  {item.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-text-muted">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {item.duration}
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{item.type}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. Daily Quote / Soothing Content */}
      <Card className="bg-indigo-900 text-white border-0 p-8 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-serif italic mb-4">
            "Peace comes from within. Do not seek it without."
          </h3>
          <p className="text-indigo-200 text-sm">— Buddha</p>
        </div>
        {/* Stars bg */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </Card>
    </div>
  );
};

export default Relaxation;
