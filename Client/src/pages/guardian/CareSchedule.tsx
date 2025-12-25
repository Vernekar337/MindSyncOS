import React from "react";
import { Card } from "../../components/ui/Card";
import { Calendar, Video, MapPin, Clock } from "lucide-react";

const CareSchedule = () => {
  const schedule = [
    {
      id: 1,
      date: "Today",
      day: "25",
      month: "OCT",
      events: [
        {
          title: "Therapy Session",
          with: "Dr. Sarah Mitchell",
          time: "10:00 AM - 10:50 AM",
          type: "Video",
          status: "Confirmed",
        },
        {
          title: "Medication Reminder",
          with: "Sertraline (50mg)",
          time: "9:00 PM",
          type: "Routine",
          status: "Pending",
        },
      ],
    },
    {
      id: 2,
      date: "Tomorrow",
      day: "26",
      month: "OCT",
      events: [
        {
          title: "Group Support Circle",
          with: "Community",
          time: "4:00 PM - 5:00 PM",
          type: "Video",
          status: "Optional",
        },
      ],
    },
    {
      id: 3,
      date: "Wednesday",
      day: "28",
      month: "OCT",
      events: [
        {
          title: "Psychiatry Review",
          with: "Dr. James Carter",
          time: "2:00 PM - 2:30 PM",
          type: "In-Person",
          status: "Confirmed",
          loc: "MindSync Clinic, Room 304",
        },
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
          <Calendar className="text-secondary" /> Care Schedule
        </h1>
        <p className="text-text-muted">
          Upcoming appointments and medication routines.
        </p>
      </div>

      <div className="space-y-6">
        {schedule.map((day) => (
          <div key={day.id} className="relative pl-8 md:pl-0">
            {/* Timeline Line (Desktop) */}
            <div className="hidden md:block absolute left-[85px] top-0 bottom-0 w-px bg-gray-200"></div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Date Column */}
              <div className="flex md:flex-col items-center md:items-end md:w-20 shrink-0 gap-2 md:gap-0">
                <span className="text-sm font-bold text-text-muted uppercase tracking-wider">
                  {day.date}
                </span>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-text-main leading-none">
                    {day.day}
                  </span>
                  <span className="block text-xs font-bold text-text-muted">
                    {day.month}
                  </span>
                </div>
              </div>

              {/* Events Column */}
              <div className="flex-1 space-y-3">
                {day.events.map((event, idx) => (
                  <Card
                    key={idx}
                    className="flex gap-4 p-4 hover:border-primary/30 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                      ${
                        event.type === "Video"
                          ? "bg-primary/10 text-primary"
                          : event.type === "Routine"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {event.type === "Video" ? (
                        <Video size={20} />
                      ) : event.type === "Routine" ? (
                        <Clock size={20} />
                      ) : (
                        <MapPin size={20} />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-text-main">
                          {event.title}
                        </h3>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            event.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : event.status === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>
                      <p className="text-sm text-text-main font-medium">
                        {event.with}
                      </p>
                      <p className="text-sm text-text-muted flex items-center gap-1 mt-1">
                        <Clock size={14} /> {event.time}
                        {event.loc && (
                          <span className="flex items-center gap-1 ml-2">
                            <MapPin size={14} /> {event.loc}
                          </span>
                        )}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareSchedule;
