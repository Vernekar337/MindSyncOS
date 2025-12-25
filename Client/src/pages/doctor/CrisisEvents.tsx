import React from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  AlertTriangle,
  Clock,
  MessageSquare,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

const CrisisEvents = () => {
  const events = [
    {
      id: 1,
      patient: "Maria Garcia",
      risk: "High Concern",
      time: "10 mins ago",
      snippet: "I don't think I can handle this anymore. It hurts too much.",
      status: "Open",
    },
    {
      id: 2,
      patient: "Anonymous User #492",
      risk: "High Concern",
      time: "2 hours ago",
      snippet: "User clicked 'I'm in crisis' button during triage.",
      status: "Investigating",
    },
    {
      id: 3,
      patient: "John Doe",
      risk: "Concerned",
      time: "Yesterday, 4:00 PM",
      snippet: "Sleep has been getting worse, feeling very hopeless.",
      status: "Resolved",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
            <AlertTriangle className="text-red-500" /> SOS & Crisis Events
          </h1>
          <p className="text-text-muted">
            Real-time monitoring of high-risk patient interactions.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-bold border border-red-100 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>2 Active
            Cases
          </span>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <Card
            key={event.id}
            className={`transition-all hover:shadow-md ${
              event.status === "Open"
                ? "border-l-4 border-l-red-500"
                : "border-l-4 border-l-gray-200"
            }`}
          >
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-text-main">
                    {event.patient}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                    ${
                      event.risk === "High Concern"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }
                  `}
                  >
                    {event.risk}
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Clock size={12} /> {event.time}
                  </span>
                </div>

                <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-lg mt-2">
                  <MessageSquare
                    size={14}
                    className="text-gray-400 mt-0.5 shrink-0"
                  />
                  <p className="text-sm text-gray-600 italic">
                    "{event.snippet}"
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                {event.status === "Resolved" ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    disabled
                  >
                    <CheckCircle size={16} className="mr-2" /> Resolved
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm">
                      History
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="shadow-red-100"
                    >
                      Open Case <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CrisisEvents;
