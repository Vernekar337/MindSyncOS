import React from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  Users,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const DoctorDashboard = () => {
  const stats = [
    {
      label: "Total Patients",
      val: "24",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Hours Today",
      val: "5.5",
      icon: Clock,
      color: "text-teal-500",
      bg: "bg-teal-50",
    },
    {
      label: "Pending Requests",
      val: "3",
      icon: Calendar,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
  ];

  const appointments = [
    {
      id: 1,
      name: "Alex Johnson",
      time: "10:00 AM",
      type: "Follow-up",
      status: "Upcoming",
      img: "A",
    },
    {
      id: 2,
      name: "Maria Garcia",
      time: "11:30 AM",
      type: "Crisis Intervention",
      status: "Upcoming",
      img: "M",
      alert: true,
    },
    {
      id: 3,
      name: "Sam Smith",
      time: "2:00 PM",
      type: "Intro Session",
      status: "Pending",
      img: "S",
    },
  ];

  const triageAlerts = [
    {
      id: 1,
      patient: "Maria Garcia",
      risk: "High",
      time: "20 mins ago",
      note: "Reported severe anxiety in vocal journal.",
    },
    {
      id: 2,
      patient: "John Doe",
      risk: "Medium",
      time: "1 hour ago",
      note: "Chat sentiment analysis indicates distress.",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-text-main">
            Doctor Dashboard
          </h1>
          <p className="text-text-muted">
            Overview of your patients and schedule.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">View Calendar</Button>
          <Button>Accept Requests (3)</Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="flex items-center gap-4 p-5 hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}
            >
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-main">{stat.val}</p>
              <p className="text-sm text-text-muted font-medium">
                {stat.label}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-text-main">
                Today's Schedule
              </h3>
              <p className="text-sm text-text-muted">
                {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-4">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="font-mono text-sm font-medium text-text-muted w-16">
                      {appt.time}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {appt.img}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-main flex items-center gap-2">
                        {appt.name}
                        {appt.alert && (
                          <AlertCircle size={14} className="text-red-500" />
                        )}
                      </h4>
                      <p className="text-xs text-text-muted">{appt.type}</p>
                    </div>
                  </div>

                  {appt.status === "Pending" ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8">
                        Decline
                      </Button>
                      <Button size="sm" className="h-8">
                        Accept
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="secondary" className="h-8">
                      Join Session
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Col: AI Alerts */}
        <div className="space-y-6">
          <Card className="border-red-100 bg-red-50/30">
            <h3 className="font-bold text-lg text-red-800 mb-4 flex items-center gap-2">
              <AlertCircle size={20} />
              Priority Alerts
            </h3>
            <div className="space-y-3">
              {triageAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white p-3 rounded-lg border border-red-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-text-main text-sm">
                      {alert.patient}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase
                      ${
                        alert.risk === "High"
                          ? "bg-red-100 text-red-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {alert.risk} Risk
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mb-2">{alert.note}</p>
                  <div className="flex justify-between items-center mt-2 border-t border-gray-50 pt-2">
                    <span className="text-[10px] text-gray-400">
                      {alert.time}
                    </span>
                    <button className="text-xs font-medium text-primary hover:underline">
                      Review Data
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="font-bold text-lg text-text-main mb-2">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-primary/30 transition-all flex items-center justify-between group">
                <span className="text-sm font-medium">Write Session Notes</span>
                <ArrowRight
                  size={16}
                  className="text-gray-300 group-hover:text-primary transition-colors"
                />
              </button>
              <button className="w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-primary/30 transition-all flex items-center justify-between group">
                <span className="text-sm font-medium">Manage Availability</span>
                <ArrowRight
                  size={16}
                  className="text-gray-300 group-hover:text-primary transition-colors"
                />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
