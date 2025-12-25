import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ChatBubble } from "../components/ui/ChatBubble";
import { Send, ShieldAlert, Phone } from "lucide-react";

const Triage = () => {
  const [input, setInput] = useState("");

  // Dummy initial chat history
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai" as const,
      text: "Hi, I'm MindSync AI. I'm here to listen. How are you feeling right now?",
      time: "10:00 AM",
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add User Message
    const userMsg = {
      id: Date.now(),
      sender: "user" as const,
      text: input,
      time: "Now",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI Reply (Mock logic)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "I hear you. That sounds overwhelming. Would you like to try a quick breathing exercise?",
          time: "Now",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Left: Chat Area */}
      <Card className="flex-1 flex flex-col p-0 overflow-hidden border-gray-200 shadow-md">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-semibold text-text-main">
            MindSync Support Assistant
          </span>
          <span className="text-xs text-text-muted ml-auto">
            Encrypted & Private
          </span>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg.text}
              sender={msg.sender}
              timestamp={msg.time}
            />
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type how you feel..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <Button type="submit" variant="primary" size="lg" disabled={!input}>
              <Send size={20} />
            </Button>
          </form>
        </div>
      </Card>

      {/* Right: Context Panel */}
      <div className="w-80 hidden lg:flex flex-col gap-4">
        <Card className="bg-blue-50 border-blue-100">
          <div className="flex items-center gap-2 mb-2 text-blue-700">
            <ShieldAlert size={18} />
            <h3 className="font-semibold">Current Status</h3>
          </div>
          <div className="inline-block px-3 py-1 bg-blue-200 text-blue-800 text-xs font-bold rounded-full mb-2">
            LOW RISK
          </div>
          <p className="text-sm text-blue-600/80">
            Our AI analyzes your conversation to ensure you get the right
            support.
          </p>
        </Card>

        <Card>
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start text-sm">
              Try Breathing Exercise
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              Book Therapist
            </Button>
          </div>
        </Card>

        <Card className="mt-auto border-red-100 bg-red-50">
          <h3 className="font-semibold text-red-700 mb-2">In Crisis?</h3>
          <Button variant="danger" className="w-full gap-2">
            <Phone size={16} />
            Emergency SOS
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Triage;
