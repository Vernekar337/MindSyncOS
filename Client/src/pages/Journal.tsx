import React, { useState, useEffect } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  Mic,
  StopCircle,
  Calendar,
  ChevronRight,
  Activity,
  BarChart2,
  ChevronLeft,
  Play,
} from "lucide-react";

// Mock Data Type
interface JournalEntry {
  id: number;
  date: string;
  time: string;
  mood: string;
  summary: string;
  energy: number;
  tension: number;
}

const Journal = () => {
  // --- STATE MANAGEMENT ---
  const [view, setView] = useState<
    "history" | "record" | "processing" | "result"
  >("history");
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);

  // Mock History
  const [history, setHistory] = useState<JournalEntry[]>([
    {
      id: 1,
      date: "Oct 24",
      time: "8:30 PM",
      mood: "Calm",
      summary: "Reflecting on a productive day at work.",
      energy: 65,
      tension: 20,
    },
    {
      id: 2,
      date: "Oct 22",
      time: "9:15 PM",
      mood: "Anxious",
      summary: "Worried about the upcoming presentation.",
      energy: 80,
      tension: 85,
    },
  ]);

  // Current Session Data
  const [analysis, setAnalysis] = useState<JournalEntry | null>(null);

  // --- RECORDING LOGIC ---
  useEffect(() => {
    let interval: number;
    if (isRecording) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimer(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setView("processing");

    // Simulate AI Processing
    setTimeout(() => {
      setAnalysis({
        id: Date.now(),
        date: "Today",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        mood: "Fatigued",
        summary: "We heard signs of stress and fatigue in your voice pattern.",
        energy: 30,
        tension: 65,
      });
      setView("result");
    }, 2500);
  };

  const handleSave = () => {
    if (analysis) {
      setHistory([analysis, ...history]);
    }
    setView("history");
  };

  // --- VIEWS ---

  // 1. RECORD SCREEN
  if (view === "record") {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-bold text-text-main mb-2">
          {isRecording ? "Listening..." : "Vocal Journal"}
        </h2>
        <p className="text-text-muted mb-12 text-center max-w-xs">
          {isRecording
            ? "You can stop whenever you want."
            : "When you’re ready, talk about how your day felt."}
        </p>

        {/* Large Circular Mic Button & Timer Ring */}
        <div className="relative mb-12">
          {/* Animated Ring */}
          {isRecording && (
            <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping"></div>
          )}
          <button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 ${
              isRecording ? "bg-red-500 text-white" : "bg-primary text-white"
            }`}
          >
            {isRecording ? <StopCircle size={48} /> : <Mic size={48} />}
          </button>

          {/* Timer Display */}
          {isRecording && (
            <div className="absolute -bottom-12 left-0 right-0 text-center font-mono text-xl font-bold text-text-main">
              {formatTime(timer)}
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          onClick={() => setView("history")}
          className="text-text-muted"
        >
          Cancel
        </Button>
      </div>
    );
  }

  // 2. PROCESSING SCREEN
  if (view === "processing") {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] animate-in fade-in">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
        <h3 className="text-xl font-bold text-text-main mb-2">
          Analyzing Voice Patterns
        </h3>
        <p className="text-text-muted text-center max-w-sm">
          We’re analyzing your voice tone and pace. This usually takes less than
          a minute.
        </p>
      </div>
    );
  }

  // 3. ANALYSIS RESULT SCREEN
  if (view === "result" && analysis) {
    return (
      <div className="max-w-xl mx-auto space-y-6 animate-in slide-in-from-bottom-8 duration-500">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 text-amber-600 mb-4">
            <Activity size={32} />
          </div>
          <h2 className="text-2xl font-bold text-text-main mb-2">
            Analysis Complete
          </h2>
          <p className="text-text-muted">
            Here is what we picked up from your session.
          </p>
        </div>

        <Card className="p-6 border-t-4 border-t-amber-400">
          <h3 className="font-bold text-lg text-text-main mb-1">
            Detected Mood
          </h3>
          <p className="text-2xl font-bold text-amber-600 mb-4">
            "{analysis.mood}"
          </p>
          <p className="text-gray-600 italic mb-6">{analysis.summary}</p>

          {/* Vocal Metrics Charts */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Vocal Energy</span>
                <span className="text-gray-500">{analysis.energy}% (Low)</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-400 rounded-full"
                  style={{ width: `${analysis.energy}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Tension Level</span>
                <span className="text-gray-500">
                  {analysis.tension}% (High)
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${analysis.tension}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
          <p className="text-xs text-blue-700 font-medium">
            This is not a medical diagnosis. It’s just an indicator based on
            vocal prosody to help guide your support.
          </p>
        </div>

        <Button className="w-full py-4 text-lg" onClick={handleSave}>
          Save to Journal
        </Button>
      </div>
    );
  }

  // 4. HISTORY SCREEN (Default)
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Vocal Journal</h1>
          <p className="text-text-muted">
            Track your emotional journey through voice.
          </p>
        </div>
        <Button
          onClick={() => setView("record")}
          className="shadow-lg shadow-primary/20"
        >
          <Mic className="mr-2" size={18} /> New Entry
        </Button>
      </div>

      <div className="space-y-4">
        {history.map((entry) => (
          <Card
            key={entry.id}
            className="hover:border-primary/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex flex-col items-center justify-center shrink-0 border border-gray-100">
                <span className="text-xs font-bold text-text-muted uppercase">
                  {entry.date.split(" ")[0]}
                </span>
                <span className="text-lg font-bold text-text-main">
                  {entry.date.split(" ")[1]}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                        ${
                          entry.mood === "Calm"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }
                      `}
                  >
                    {entry.mood}
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Play size={10} /> {entry.time}
                  </span>
                </div>
                <h3 className="font-semibold text-text-main group-hover:text-primary transition-colors">
                  {entry.summary}
                </h3>
              </div>

              <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Journal;
