import React, { useState, useEffect } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Wind, Music, Coffee, ArrowLeft, Play } from "lucide-react";

const Relaxation = () => {
  const [activeMode, setActiveMode] = useState<"menu" | "breathing">("menu");

  // Breathing Exercise Component
  const BreathingExercise = () => {
    const [phase, setPhase] = useState("Inhale");
    const [scale, setScale] = useState(1);

    useEffect(() => {
      // 4-7-8 Breathing Pattern Loop
      const cycle = () => {
        setPhase("Inhale");
        setScale(1.5); // Expand
        setTimeout(() => {
          setPhase("Hold");
          setTimeout(() => {
            setPhase("Exhale");
            setScale(1); // Contract
          }, 2000); // Hold for 2s (shortened for demo)
        }, 4000); // Inhale for 4s
      };

      cycle();
      const interval = setInterval(cycle, 10000); // Total cycle 10s
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="flex flex-col items-center justify-center h-full animate-in fade-in duration-500">
        <div
          className="w-48 h-48 bg-primary/20 rounded-full flex items-center justify-center transition-all duration-[4000ms] ease-in-out relative"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="w-32 h-32 bg-primary/40 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
            <div className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center">
              <Wind className="text-primary opacity-50" size={32} />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-primary mt-12 mb-2 transition-all">
          {phase}
        </h2>
        <p className="text-text-muted">Focus on your breath...</p>

        <Button
          variant="outline"
          onClick={() => setActiveMode("menu")}
          className="mt-12"
        >
          <ArrowLeft size={16} className="mr-2" /> End Exercise
        </Button>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      {activeMode === "breathing" ? (
        <BreathingExercise />
      ) : (
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-main">
              Relaxation Hub
            </h2>
            <p className="text-text-muted">
              Tools to help you reset and find your calm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Breathing Card */}
            <Card
              className="hover:border-primary/50 transition-all cursor-pointer group bg-gradient-to-br from-teal-50 to-white"
              onClick={() => setActiveMode("breathing")}
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wind className="text-teal-500" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-1">4-7-8 Breathing</h3>
              <p className="text-sm text-text-muted mb-4">
                A powerful technique to reduce anxiety quickly.
              </p>
              <span className="text-xs font-bold text-teal-600 bg-teal-100 px-2 py-1 rounded">
                5 MIN
              </span>
            </Card>

            {/* Soundscape Card */}
            <Card className="hover:border-indigo-300 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Music className="text-indigo-500" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-1">Lo-Fi Rain</h3>
              <p className="text-sm text-text-muted mb-4">
                Gentle rain sounds to help you focus or sleep.
              </p>
              <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm">
                <Play size={14} /> Play Now
              </div>
            </Card>

            {/* Grounding Card */}
            <Card className="hover:border-amber-300 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Coffee className="text-amber-500" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-1">
                5-4-3-2-1 Grounding
              </h3>
              <p className="text-sm text-text-muted mb-4">
                Reconnect with your senses when you feel overwhelmed.
              </p>
              <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded">
                GUIDED
              </span>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Relaxation;
