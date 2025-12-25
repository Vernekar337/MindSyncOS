import React, { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Send, Shield, Activity, Phone, Bot } from "lucide-react";
import { CrisisOverlay } from "../components/CrisisOverlay"; // <--- Import Overlay

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  time: string;
}

const Triage = () => {
  // Initial State matches "Tell me what's on your mind" headline req
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello. I'm MindSync AI. I'm here to listen and help you figure out what support you need. How are you feeling right now?",
      sender: "ai",
      time: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [riskLevel, setRiskLevel] = useState<
    "Calm" | "Concerned" | "High Concern"
  >("Calm");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: "user",
      time: "Just now",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // 2. Simulate AI Analysis & Response (Mock Logic for Demo)
    setTimeout(() => {
      let aiText = "I hear you. Can you tell me more about that?";
      let newRisk: "Calm" | "Concerned" | "High Concern" = "Calm";

      // Simple keyword detection to demonstrate Risk States
      const lowerText = text.toLowerCase();

      if (
        lowerText.includes("worse") ||
        lowerText.includes("anxious") ||
        lowerText.includes("stress")
      ) {
        aiText =
          "I'm sorry you're feeling that way. It sounds like things are heavy right now. Have you been able to sleep?";
        newRisk = "Concerned";
      } else if (
        lowerText.includes("crisis") ||
        lowerText.includes("hurt") ||
        lowerText.includes("die") ||
        lowerText.includes("suicide")
      ) {
        aiText =
          "I am concerned about your safety. I strongly recommend we connect you with a human professional right now.";
        newRisk = "High Concern";
      }

      setRiskLevel(newRisk);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: aiText, sender: "ai", time: "Just now" },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* TRIGGER CRISIS MODE IF HIGH RISK (Spec 6.3) */}
      {riskLevel === "High Concern" && (
        <CrisisOverlay onDismiss={() => setRiskLevel("Concerned")} />
      )}

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)] animate-in fade-in duration-500">
        {/* LEFT (Main Area): Chat Thread */}
        <Card className="flex-1 flex flex-col p-0 overflow-hidden border-gray-200 shadow-sm relative">
          {/* Header / Headline */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center z-10">
            <div>
              <h2 className="font-bold text-text-main text-lg">
                Tell me what’s on your mind
              </h2>
              <p className="text-xs text-text-muted">Private and encrypted.</p>
            </div>
            {/* Live Status Badge */}
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
              <span
                className={`w-2 h-2 rounded-full ${
                  riskLevel === "High Concern"
                    ? "bg-red-500 animate-pulse"
                    : "bg-green-500"
                }`}
              ></span>
              <span className="text-xs font-medium text-text-muted">
                MindSync AI Active
              </span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex flex-col max-w-[80%] lg:max-w-[70%] space-y-1 ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  {/* AI Badge */}
                  {msg.sender === "ai" && (
                    <span className="text-[10px] font-bold text-primary mb-1 flex items-center gap-1">
                      <Bot size={12} /> MindSync AI
                    </span>
                  )}

                  {/* Bubble */}
                  <div
                    className={`
                    p-4 rounded-2xl text-sm leading-relaxed shadow-sm relative
                    ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-br-none" // Primary Color Bubble
                        : "bg-gray-100 text-text-main rounded-bl-none"
                    } // Neutral Background
                  `}
                  >
                    {msg.text}
                  </div>

                  {/* Time Stamp */}
                  <span className="text-[10px] text-gray-400 px-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 relative z-10">
            {/* Optional Quick-Reply Chips */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => handleSend("I feel worse today")}
                className="whitespace-nowrap px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-text-muted hover:bg-gray-100 hover:text-text-main transition-colors"
              >
                I feel worse today
              </button>
              <button
                onClick={() => handleSend("I feel okay")}
                className="whitespace-nowrap px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-text-muted hover:bg-gray-100 hover:text-text-main transition-colors"
              >
                I feel okay
              </button>
              <button
                onClick={() => handleSend("I'm in crisis")}
                className="whitespace-nowrap px-4 py-2 bg-red-50 border border-red-100 rounded-full text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
              >
                I’m in crisis
              </button>
            </div>

            {/* Large Text Input */}
            <div className="flex gap-2 items-end bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
              <div className="flex-1">
                <textarea
                  placeholder="Type anything you’re feeling or experiencing right now…"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="w-full bg-transparent border-none focus:ring-0 resize-none text-sm p-2 max-h-32 min-h-[44px]"
                  rows={1}
                />
              </div>
              <Button
                className="rounded-xl w-10 h-10 p-0 flex items-center justify-center mb-0.5"
                onClick={() => handleSend()}
              >
                <Send size={18} />
              </Button>
            </div>

            {/* Subtle Note */}
            <div className="text-center mt-2">
              <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                <Shield size={10} /> Private and encrypted.
              </span>
            </div>
          </div>
        </Card>

        {/* RIGHT PANEL (Context): Risk Indicator & Next Steps */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          {/* Risk Level Indicator */}
          <Card
            className={`border-l-4 transition-colors duration-500 ${
              riskLevel === "High Concern"
                ? "border-l-red-500 bg-red-50/20"
                : riskLevel === "Concerned"
                ? "border-l-amber-500 bg-amber-50/20"
                : "border-l-green-500 bg-green-50/20"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Activity
                size={18}
                className={
                  riskLevel === "High Concern"
                    ? "text-red-500"
                    : riskLevel === "Concerned"
                    ? "text-amber-500"
                    : "text-green-500"
                }
              />
              <span className="font-bold text-sm uppercase tracking-wider text-text-muted">
                Risk Analysis
              </span>
            </div>

            <h3
              className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                riskLevel === "High Concern"
                  ? "text-red-700"
                  : riskLevel === "Concerned"
                  ? "text-amber-700"
                  : "text-green-700"
              }`}
            >
              {riskLevel}
            </h3>

            <p className="text-xs text-text-muted leading-tight">
              AI monitors conversation sentiment to automatically route you to
              the appropriate level of support.
            </p>
          </Card>

          {/* Suggested Next Steps */}
          <Card>
            <h4 className="font-bold text-text-main mb-4 flex items-center gap-2">
              <Bot size={16} className="text-primary" /> Suggested Actions
            </h4>

            <div className="space-y-3">
              {riskLevel === "High Concern" ? (
                // High Risk Actions
                <>
                  <Button
                    variant="danger"
                    className="w-full justify-start text-left h-auto py-3 px-4 shadow-red-200"
                  >
                    <div>
                      <span className="block font-bold">
                        Talk to Someone Now
                      </span>
                      <span className="text-[10px] opacity-90">
                        Priority connect (Wait: &lt; 1 min)
                      </span>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 px-4 border-red-200 hover:bg-red-50 text-red-600"
                  >
                    <div className="flex items-center gap-3">
                      <Phone size={18} />
                      <span className="text-sm font-medium">
                        Emergency Contacts
                      </span>
                    </div>
                  </Button>
                </>
              ) : (
                // Low/Medium Risk Actions
                <>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm font-medium text-text-main hover:text-primary hover:border-primary/30"
                  >
                    Try a calming exercise
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm font-medium text-text-main hover:text-primary hover:border-primary/30"
                  >
                    See recommended therapists
                  </Button>
                </>
              )}
            </div>
          </Card>

          {/* Footer Disclaimer */}
          <div className="mt-auto p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-[10px] text-gray-500 text-center leading-relaxed">
              MindSync AI is an automated support tool. Conversational data is
              used to assist medical professionals but does not replace a
              clinical diagnosis.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Triage;
