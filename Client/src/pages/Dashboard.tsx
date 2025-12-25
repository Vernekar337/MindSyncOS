import React from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MessageSquare,
  Video,
  Mic,
  Wind,
  ArrowRight,
  Zap,
  Trophy,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("mindSyncUser") || "{}");

  // Mock Data for Heatmap (Last 30 days)
  // 1 = Good (Green), 2 = Okay (Yellow), 3 = Bad (Orange), 0 = No Data (Gray)
  const moodHistory = [
    1, 1, 2, 1, 3, 2, 1, 1, 2, 2, 1, 1, 1, 2, 3, 3, 2, 1, 1, 2, 1, 1, 1, 1, 2,
    0, 0, 0,
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Header with Supportive Microcopy */}
      <div>
        <h1 className="text-3xl font-bold text-text-main">
          Welcome back, {user.name?.split(" ")[0] || "User"}
        </h1>
        <p className="text-text-muted mt-2">
          Showing up is a big step. We're glad you're here today.
        </p>
      </div>

      {/* 2. Top Row: Next Appointment & Emotional Weather */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Appointment */}
        <Card className="flex flex-col justify-between relative overflow-hidden border-l-4 border-l-secondary">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">Next Appointment</h3>
              <span className="bg-secondary/10 text-secondary text-xs font-bold px-2 py-1 rounded-full">
                In 22 hours
              </span>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100"
                alt="Dr. Sarah"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <p className="font-bold text-text-main">Dr. Sarah Mitchell</p>
                <p className="text-sm text-text-muted">Anxiety Specialist</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button
              className="w-full bg-secondary hover:bg-secondary-hover"
              onClick={() => navigate("/sessions")}
            >
              View Details
            </Button>
          </div>
        </Card>

        {/* Emotional Weather */}
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-1">
                Today's Weather
              </p>
              <h3 className="text-2xl font-bold text-text-main mb-1">
                Feeling Calm 🌤️
              </h3>
              <p className="text-sm text-text-muted">
                Based on your check-in 2 hours ago.
              </p>
            </div>
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-2xl">
              😌
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <Button
              size="sm"
              variant="outline"
              className="bg-white"
              onClick={() => navigate("/journal")}
            >
              Check-in Again
            </Button>
          </div>
        </Card>
      </div>

      {/* 3. Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Sessions",
            val: "12",
            icon: Video,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Journal",
            val: "5",
            icon: BookOpen,
            color: "text-pink-500",
            bg: "bg-pink-50",
          },
          {
            label: "Community",
            val: "Active",
            icon: Zap,
            color: "text-amber-500",
            bg: "bg-amber-50",
          },
          {
            label: "Streak",
            val: "3 Days",
            icon: Trophy,
            color: "text-green-500",
            bg: "bg-green-50",
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="flex flex-col items-center justify-center p-4 text-center hover:shadow-md transition-shadow"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${stat.bg} ${stat.color}`}
            >
              <stat.icon size={20} />
            </div>
            <span className="text-xl font-bold text-text-main block">
              {stat.val}
            </span>
            <span className="text-xs text-text-muted font-medium uppercase tracking-wide">
              {stat.label}
            </span>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 4. Mood Heatmap (Month View) */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-bold text-text-main mb-4">
            Mood History
          </h3>
          <Card className="p-5">
            <div className="grid grid-cols-7 gap-2">
              {moodHistory.map((mood, idx) => (
                <div
                  key={idx}
                  className={`
                    w-full aspect-square rounded-md transition-all hover:scale-110 cursor-pointer
                    ${
                      mood === 1
                        ? "bg-green-400"
                        : mood === 2
                        ? "bg-yellow-400"
                        : mood === 3
                        ? "bg-orange-400"
                        : "bg-gray-100"
                    }
                  `}
                  title={
                    mood === 1
                      ? "Good"
                      : mood === 2
                      ? "Okay"
                      : mood === 3
                      ? "Bad"
                      : "No Data"
                  }
                ></div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-text-muted">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400"></div> Good
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div> Okay
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div> Tough
              </div>
            </div>
          </Card>
        </div>

        {/* 5. Recommended For You */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold text-text-main">
              Recommended for you
            </h3>
            <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recommendation 1 */}
            <Card
              className="hover:border-primary/50 transition-colors cursor-pointer group"
              onClick={() => navigate("/relaxation")}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                  <Wind size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-text-main">4-7-8 Breathing</h4>
                  <p className="text-sm text-text-muted mt-1">
                    5 min • Relaxation
                  </p>
                </div>
              </div>
            </Card>

            {/* Recommendation 2 */}
            <Card
              className="hover:border-primary/50 transition-colors cursor-pointer group"
              onClick={() => navigate("/journal")}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <Mic size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-text-main">
                    Quick Voice Journal
                  </h4>
                  <p className="text-sm text-text-muted mt-1">
                    2 min • Reflection
                  </p>
                </div>
              </div>
            </Card>

            {/* Recommendation 3 */}
            <Card
              className="hover:border-primary/50 transition-colors cursor-pointer group"
              onClick={() => navigate("/triage")}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-text-main">
                    Chat with AI Triage
                  </h4>
                  <p className="text-sm text-text-muted mt-1">
                    Always available • Support
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
