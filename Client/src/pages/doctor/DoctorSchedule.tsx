import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Avatar } from "../../components/ui/Avatar";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DoctorSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock Appointments Data
  const appointments = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "Alex Johnson",
      type: "Video Therapy",
      status: "Upcoming",
      duration: "50 min",
      tags: ["Anxiety"],
    },
    {
      id: 2,
      time: "10:30 AM",
      patient: "Maria Garcia",
      type: "In-Person",
      status: "Confirmed",
      duration: "60 min",
      tags: ["Post-Partum"],
    },
    {
      id: 3,
      time: "01:00 PM",
      patient: "James Wilson",
      type: "Video Therapy",
      status: "Pending",
      duration: "30 min",
      tags: ["Check-in"],
    },
    {
      id: 4,
      time: "03:30 PM",
      patient: "Linda Chen",
      type: "Emergency",
      status: "Urgent",
      duration: "45 min",
      tags: ["Crisis"],
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Header & Date Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          <p className="text-gray-500">
            Manage your appointments and availability.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedDate(new Date())}
          >
            Today
          </Button>
          <div className="h-4 w-px bg-gray-200"></div>
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-500">
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-bold text-gray-700 min-w-[100px] text-center">
            Oct 24, 2025
          </span>
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-500">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Timeline View */}
        <div className="lg:col-span-2 space-y-4">
          {appointments.map((apt) => (
            <Card
              key={apt.id}
              className={`flex flex-col md:flex-row gap-4 p-4 border-l-4 ${
                apt.status === "Urgent"
                  ? "border-l-red-500 bg-red-50/10"
                  : "border-l-secondary"
              }`}
            >
              {/* Time Column */}
              <div className="min-w-[100px] flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-0">
                <span className="font-bold text-lg text-gray-900">
                  {apt.time}
                </span>
                <span className="text-xs text-gray-500">{apt.duration}</span>
              </div>

              {/* Details Column */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {apt.patient}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      {apt.type === "Video Therapy" ? (
                        <Video size={14} className="text-secondary" />
                      ) : (
                        <MapPin size={14} className="text-gray-400" />
                      )}
                      {apt.type}
                    </div>
                  </div>
                  <Badge
                    variant={
                      apt.status === "Urgent"
                        ? "danger"
                        : apt.status === "Pending"
                        ? "warning"
                        : "success"
                    }
                  >
                    {apt.status}
                  </Badge>
                </div>

                <div className="flex gap-2 mt-3">
                  {apt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Column */}
              <div className="flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-4 mt-2 md:mt-0">
                <Button size="sm" className="w-full">
                  Join
                </Button>
                <Button size="sm" variant="ghost" className="w-full">
                  Reschedule
                </Button>
              </div>
            </Card>
          ))}

          {/* Empty State Slot */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
            <span className="font-bold text-sm">
              + Add Blocked Time or Appointment
            </span>
          </div>
        </div>

        {/* 3. Mini Calendar Sidebar */}
        <div className="space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-gray-700">October 2025</span>
            </div>
            {/* Simplified Calendar Grid Visual */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {Array.from({ length: 31 }, (_, i) => (
                <button
                  key={i}
                  className={`h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100 ${
                    i + 1 === 24 ? "bg-secondary text-white font-bold" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </Card>

          <Card className="bg-blue-50 border-blue-100">
            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <Clock size={16} /> Availability Status
            </h4>
            <p className="text-sm text-blue-600 mb-3">
              You are currently visible as <strong>Available</strong> for
              instant bookings.
            </p>
            <Button
              size="sm"
              variant="secondary"
              className="w-full bg-white border-blue-200 text-blue-700"
            >
              Update Status
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
