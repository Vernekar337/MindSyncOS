import React from "react";
import { Button } from "./ui/Button";
import { Phone, ShieldAlert } from "lucide-react";

interface CrisisOverlayProps {
  onDismiss: () => void;
}

export const CrisisOverlay: React.FC<CrisisOverlayProps> = ({ onDismiss }) => {
  return (
    // "Global nav and non-essential UI dimmed or hidden"
    <div className="fixed inset-0 z-[100] bg-gray-900/90 flex items-center justify-center p-4 animate-in fade-in duration-700 backdrop-blur-sm">
      {/* "Central card dominates the viewport" */}
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden border-t-8 border-amber-500 transform transition-all scale-100">
        <div className="p-8 text-center space-y-6">
          {/* Visuals: Firm but calm palette */}
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={32} className="text-amber-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              You’re not alone.
            </h2>
            <p className="text-lg text-gray-600">
              Let’s focus on keeping you safe right now.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            {/* Primary CTA: High emphasis + Subtle pulsing animation */}
            <Button className="w-full h-14 text-lg shadow-xl shadow-amber-500/20 bg-amber-600 hover:bg-amber-700 border-transparent animate-pulse">
              Talk to someone now
            </Button>

            {/* Secondary link */}
            <Button
              variant="outline"
              className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Phone size={18} className="mr-2" /> View emergency contacts
            </Button>
          </div>

          <div className="pt-6">
            <button
              onClick={onDismiss}
              className="text-sm text-gray-400 hover:text-gray-600 underline decoration-gray-300 underline-offset-4 transition-colors"
            >
              I’m safe right now, continue chat
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400">
            MindSync Crisis Support Protocol • Secure & Private
          </p>
        </div>
      </div>
    </div>
  );
};
