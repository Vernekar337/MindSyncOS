import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  MoreVertical,
  Layout,
} from "lucide-react";

const Sessions = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showNotes, setShowNotes] = useState(true);

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        {/* Remote Video (Doctor) - Placeholder */}
        <div className="flex-1 flex items-center justify-center relative">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
            alt="Doctor"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute top-4 left-4 bg-black/40 px-3 py-1 rounded-full text-white text-sm backdrop-blur-sm">
            Dr. Sarah Mitchell
          </div>
        </div>

        {/* Local Video (Self) - Floating */}
        <div className="absolute bottom-24 right-6 w-48 h-32 bg-gray-800 rounded-xl border-2 border-white/20 shadow-lg overflow-hidden">
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white/50 text-xs">
            {isVideoOn ? "Your Video" : "Video Off"}
          </div>
        </div>

        {/* Control Bar */}
        <div className="h-20 bg-gray-900/90 backdrop-blur-md flex items-center justify-center gap-4 border-t border-white/10 px-6">
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`p-4 rounded-full transition-all ${
              isMicOn
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-4 rounded-full transition-all ${
              isVideoOn
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
          </button>

          <Button
            variant="danger"
            className="h-14 px-8 rounded-full ml-4 font-semibold text-lg shadow-red-900/50 shadow-lg"
          >
            <PhoneOff size={24} className="mr-2" /> End Session
          </Button>

          <div className="w-px h-8 bg-gray-700 mx-2"></div>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`p-4 rounded-full transition-all ${
              showNotes ? "bg-primary text-white" : "bg-gray-700 text-white"
            }`}
          >
            <Layout size={24} />
          </button>
        </div>
      </div>

      {/* Right Sidebar: Session Tools */}
      {showNotes && (
        <div className="w-80 flex flex-col gap-4">
          <Card className="flex-1 flex flex-col">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-primary" />
              Live Emotions
            </h3>

            {/* AI Analysis Mockup */}
            <div className="space-y-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-600 font-bold mb-1 uppercase tracking-wider">
                  Current Vibe
                </p>
                <p className="text-lg font-medium text-blue-900">
                  Reflective & Calm
                </p>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 w-[70%]"></div>
              </div>
              <p className="text-xs text-text-muted text-right">
                Stress Level: Low
              </p>
            </div>

            <div className="border-t border-gray-100 pt-4 flex-1">
              <h4 className="text-sm font-semibold mb-2">Session Notes</h4>
              <textarea
                className="w-full h-full p-3 bg-gray-50 rounded-lg border-0 resize-none text-sm focus:ring-1 focus:ring-primary"
                placeholder="Jot down key takeaways..."
              ></textarea>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Sessions;
