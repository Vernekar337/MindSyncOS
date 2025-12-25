import React from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { AlertTriangle, CheckCircle, Clock, ShieldAlert } from "lucide-react";

const SafetyAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: "Critical",
      title: "High Stress Detected",
      desc: "AI Triage detected elevated stress markers during evening check-in.",
      time: "Yesterday, 8:45 PM",
      status: "Resolved",
      actionTaken: "Patient completed breathing exercise. Risk lowered.",
    },
    {
      id: 2,
      type: "Warning",
      title: "Missed Journal Entry",
      desc: "Patient has not recorded a mood entry in 3 days.",
      time: "Oct 24, 9:00 AM",
      status: "Active",
      actionTaken: "Reminder sent to patient.",
    },
    {
      id: 3,
      type: "Info",
      title: "Medication Skipped",
      desc: "Patient reported missing morning dose of Sertraline.",
      time: "Oct 22, 10:30 AM",
      status: "Ack",
      actionTaken: "Logged in system.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
            <ShieldAlert className="text-red-500" /> Safety Alerts
          </h1>
          <p className="text-text-muted">
            Monitor potential risks and system notifications.
          </p>
        </div>
        <Button variant="outline">Customize Alerts</Button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            className={`border-l-4 ${
              alert.type === "Critical"
                ? "border-l-red-500 bg-red-50/10"
                : alert.type === "Warning"
                ? "border-l-amber-500 bg-amber-50/10"
                : "border-l-blue-500 bg-blue-50/10"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      alert.type === "Critical"
                        ? "bg-red-100 text-red-700"
                        : alert.type === "Warning"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {alert.type}
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Clock size={12} /> {alert.time}
                  </span>
                </div>
                <h3 className="font-bold text-text-main text-lg">
                  {alert.title}
                </h3>
                <p className="text-text-main mt-1">{alert.desc}</p>

                <div className="mt-3 flex items-start gap-2 text-sm bg-white/50 p-2 rounded border border-gray-100">
                  <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  <span className="text-gray-600">
                    <span className="font-semibold">System Action:</span>{" "}
                    {alert.actionTaken}
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                {alert.status === "Active" ? (
                  <Button size="sm" className="w-full md:w-auto">
                    Mark as Read
                  </Button>
                ) : (
                  <span className="text-sm font-medium text-text-muted px-4">
                    Archived
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SafetyAlerts;
