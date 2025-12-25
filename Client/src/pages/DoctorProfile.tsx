import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { BookingModal } from "../components/BookingModal";
import { doctors } from "./Appointments"; // Import mock data
import {
  Star,
  Globe,
  Shield,
  Calendar,
  ChevronLeft,
  Video,
} from "lucide-react";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((d) => d.id === Number(id));

  const [selectedDate, setSelectedDate] = useState("Today");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    time: string;
  } | null>(null);

  if (!doctor) return <div>Doctor not found</div>;

  const handleSlotClick = (time: string) => {
    setSelectedSlot({ date: selectedDate, time });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <Button
        variant="ghost"
        onClick={() => navigate("/appointments")}
        className="pl-0 gap-1 text-text-muted hover:text-text-main"
      >
        <ChevronLeft size={20} /> Back to list
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COL: Full Profile */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-blue-50 p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 rounded-2xl object-cover shadow-lg border-4 border-white"
              />
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-text-main">
                  {doctor.name}
                </h1>
                <p className="text-lg text-primary font-medium">
                  {doctor.specialty}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-text-muted">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />{" "}
                    {doctor.rating} Rating
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield size={14} /> License verified
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">About</h3>
                <p className="text-gray-600 leading-relaxed">
                  {doctor.bio} With a patient-centered approach, I focus on
                  creating a safe environment where we can explore the root
                  causes of distress together.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-bold text-sm text-gray-900 mb-1">
                    Languages
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe size={16} /> English, Spanish
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-bold text-sm text-gray-900 mb-1">
                    Experience
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield size={16} /> 12 Years Practice
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COL: Calendar & Time Slots */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-secondary" /> Book a Session
            </h3>

            {/* Day Selector */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {["Today", "Tomorrow", "Wed 28"].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`flex-1 min-w-[80px] py-2 rounded-lg text-sm font-medium border transition-all ${
                    selectedDate === day
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                      : "bg-white border-gray-200 text-text-muted hover:border-primary/50"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Time Slot Grid */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
                  Morning
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {["09:00 AM", "10:30 AM", "11:00 AM"].map((time) => (
                    <button
                      key={time}
                      onClick={() => handleSlotClick(time)}
                      className="py-2 px-3 rounded-lg border border-gray-200 text-sm hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-center"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
                  Afternoon
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {["02:00 PM", "03:30 PM", "04:00 PM", "05:30 PM"].map(
                    (time) => (
                      <button
                        key={time}
                        onClick={() => handleSlotClick(time)}
                        className="py-2 px-3 rounded-lg border border-gray-200 text-sm hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-center"
                      >
                        {time}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-center justify-center text-gray-400">
                <Video size={14} /> All sessions are 50 min video calls
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Booking Modal Component */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctor={doctor}
        slot={selectedSlot}
      />
    </div>
  );
};

export default DoctorProfile;
