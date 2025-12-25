import React, { useState, useEffect } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Mic, Square, Play, Calendar, BarChart2 } from "lucide-react";

const Journal = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);

  // Simple timer effect for recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);
    } else {
      setDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const entries = [
    {
      id: 1,
      date: "Today, 9:30 AM",
      duration: "2:15",
      mood: "Calm",
      summary: "Felt good about the morning routine.",
    },
    {
      id: 2,
      date: "Yesterday, 8:45 PM",
      duration: "1:45",
      mood: "Anxious",
      summary: "Worried about the upcoming presentation.",
    },
    {
      id: 3,
      date: "Oct 24, 6:00 PM",
      duration: "3:20",
      mood: "Tired",
      summary: "Long day at work, feeling drained.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
      {/* Left: Recorder */}
      <Card className="flex flex-col items-center justify-center text-center border-primary/20 bg-gradient-to-b from-white to-primary/5">
        <h2 className="text-2xl font-bold text-text-main mb-2">
          Vocal Journal
        </h2>
        <p className="text-text-muted mb-12">
          Speak your mind freely. We'll analyze the sentiment.
        </p>

        <div className="relative mb-12">
          {/* Pulsating Ring Animation */}
          {isRecording && (
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
          )}

          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-xl
               ${
                 isRecording
                   ? "bg-red-500 text-white scale-110"
                   : "bg-primary text-white hover:bg-primary-hover hover:scale-105"
               }`}
          >
            {isRecording ? <Square size={40} /> : <Mic size={40} />}
          </button>
        </div>

        {isRecording && (
          <div className="space-y-2">
            <p className="text-3xl font-mono text-text-main font-light">
              {formatTime(duration)}
            </p>
            <p className="text-sm text-red-500 animate-pulse font-medium">
              Recording...
            </p>
          </div>
        )}

        {!isRecording && (
          <p className="text-sm text-text-muted">Tap the microphone to start</p>
        )}
      </Card>

      {/* Right: History */}
      <div className="flex flex-col gap-4 overflow-y-auto">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Calendar size={20} /> Past Entries
        </h3>

        {entries.map((entry) => (
          <Card
            key={entry.id}
            className="hover:border-primary/50 transition-colors cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-text-main">{entry.date}</p>
                <p className="text-xs text-text-muted">
                  {entry.duration} •{" "}
                  <span className="text-primary font-medium">{entry.mood}</span>
                </p>
              </div>
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-primary group-hover:text-white transition-colors">
                <Play size={14} className="ml-1" />
              </button>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {entry.summary}
            </p>

            {/* Mini visualizer bar */}
            <div className="mt-3 flex items-center gap-1 h-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gray-200 rounded-full"
                  style={{ height: `${Math.random() * 100}%` }}
                ></div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Journal;
