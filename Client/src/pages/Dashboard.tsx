import React from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Calendar, ArrowRight, Activity, BookHeart, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Appointment Card */}
        <Card className="flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10" />
          <div>
            <h3 className="text-lg font-semibold mb-1">Next Appointment</h3>
            <p className="text-text-muted text-sm">Starts in 22 hours</p>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              Dr
            </div>
            <div>
              <p className="font-medium text-text-main">Dr. Sarah Mitchell</p>
              <p className="text-sm text-text-muted">Anxiety Specialist</p>
            </div>
          </div>
          <div className="mt-6">
            <Button variant="secondary" className="w-full">
              View Details
            </Button>
          </div>
        </Card>

        {/* Emotional Weather */}
        <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
          <h3 className="text-lg font-semibold text-secondary">
            Emotional Weather
          </h3>
          <div className="mt-4 flex items-center gap-4">
            <div className="text-4xl">🌤️</div>
            <div>
              <p className="text-2xl font-bold text-text-main">Feeling Calm</p>
              <p className="text-sm text-text-muted">
                Based on your recent check-ins.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="mt-4 text-secondary hover:text-secondary-hover p-0"
          >
            Check-in now <ArrowRight size={16} className="ml-2" />
          </Button>
        </Card>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Sessions",
            val: "12",
            icon: Calendar,
            color: "text-blue-500",
          },
          {
            label: "Journal",
            val: "5",
            icon: BookHeart,
            color: "text-pink-500",
          },
          {
            label: "Community",
            val: "Active",
            icon: Users,
            color: "text-green-500",
          },
          {
            label: "Streak",
            val: "3 Days",
            icon: Activity,
            color: "text-orange-500",
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="flex flex-col items-center justify-center p-4 text-center"
          >
            <stat.icon className={`mb-2 ${stat.color}`} size={24} />
            <span className="text-2xl font-bold text-text-main">
              {stat.val}
            </span>
            <span className="text-xs text-text-muted uppercase tracking-wider">
              {stat.label}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
