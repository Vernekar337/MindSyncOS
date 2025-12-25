import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/Button";

interface BreathingExerciseProps {
  onClose: () => void;
}

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({
  onClose,
}) => {
  const [phase, setPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  const [timeLeft, setTimeLeft] = useState(4); // Start with Inhale duration
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let timer: number;

    // Animation Logic for 4-7-8 Breathing
    const runCycle = () => {
      // 1. Inhale (4s)
      setPhase("Inhale");
      setTimeLeft(4);
      setScale(1.5); // Expand circle

      setTimeout(() => {
        // 2. Hold (7s)
        setPhase("Hold");
        setTimeLeft(7);
        // Scale stays expanded

        setTimeout(() => {
          // 3. Exhale (8s)
          setPhase("Exhale");
          setTimeLeft(8);
          setScale(1); // Contract circle

          // Recursive call or loop handling done by effect dependencies if needed
          // For simplicity, we just let this effect run once per component mount
          // but typically you'd wrap this in a loop function.
          // Below is a simplified interval approach for the countdown text.
        }, 7000);
      }, 4000);
    };

    runCycle();

    // Loop the cycle every 19 seconds (4+7+8)
    const cycleInterval = setInterval(runCycle, 19000);

    // Countdown timer for text
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    return () => {
      clearInterval(cycleInterval);
      clearInterval(countdown);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-teal-50 flex flex-col items-center justify-center animate-in fade-in duration-700">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/50 hover:bg-white text-teal-800 transition-colors"
      >
        <X size={32} />
      </button>

      <div className="text-center space-y-12 relative">
        {/* Instruction Text */}
        <div>
          <h2 className="text-4xl font-bold text-teal-900 mb-2 transition-all duration-500">
            {phase}
          </h2>
          <p className="text-teal-600 font-medium text-xl">{timeLeft}s</p>
        </div>

        {/* Animated Circle UI */}
        <div className="relative flex items-center justify-center h-80 w-80">
          {/* Outer Glow */}
          <div
            className="absolute w-64 h-64 bg-teal-200/50 rounded-full blur-3xl transition-all duration-[4000ms] ease-in-out"
            style={{ transform: `scale(${scale * 1.2})` }}
          />

          {/* Main Breathing Circle */}
          <div
            className="w-64 h-64 bg-white rounded-full shadow-2xl flex items-center justify-center border-8 border-teal-100 transition-all duration-[4000ms] ease-in-out"
            style={{
              transform: `scale(${scale})`,
              transitionDuration:
                phase === "Exhale"
                  ? "8000ms"
                  : phase === "Inhale"
                  ? "4000ms"
                  : "0ms",
            }}
          >
            <div className="w-4 h-4 bg-teal-400 rounded-full" />
          </div>
        </div>

        <p className="text-teal-700/60 max-w-sm mx-auto text-lg">
          Focus on your breath. Let go of tension as you exhale.
        </p>

        <Button
          variant="outline"
          className="border-teal-200 text-teal-800 hover:bg-teal-100"
          onClick={onClose}
        >
          End Session
        </Button>
      </div>
    </div>
  );
};
