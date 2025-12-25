import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Calendar, Clock, Video, CheckCircle, X } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: any;
  slot: { date: string; time: string } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  doctor,
  slot,
}) => {
  const [step, setStep] = useState(1);
  const [note, setNote] = useState("");

  if (!isOpen || !doctor || !slot) return null;

  // Step 3: Success View
  if (step === 3) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-500 mb-6">
            You are all set for your session with {doctor.name}.
          </p>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 text-left">
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-700">{slot.date}</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Clock size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-700">{slot.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <Video size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-700">
                Video Consultation
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full" onClick={onClose}>
              Add to Calendar
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              View All Appointments
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">
            {step === 1 ? "Booking Details" : "Confirm Appointment"}
          </h3>
          <button onClick={onClose}>
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {step === 1 ? (
            // STEP 1: Context Input
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  What do you want help with?
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["Anxiety", "Sleep", "Just checking in", "Stress"].map(
                    (chip) => (
                      <button
                        key={chip}
                        type="button"
                        className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {chip}
                      </button>
                    )
                  )}
                </div>
                <textarea
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  rows={4}
                  placeholder="Feel free to add any specific notes for Dr. Mitchell..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={() => setStep(2)}>
                Next: Review
              </Button>
            </div>
          ) : (
            // STEP 2: Confirmation
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <img
                  src={doctor.image}
                  className="w-16 h-16 rounded-xl object-cover"
                  alt="Doc"
                />
                <div>
                  <h4 className="font-bold text-lg text-gray-900">
                    {doctor.name}
                  </h4>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <span className="block text-xs text-blue-500 font-bold uppercase">
                    Date
                  </span>
                  <span className="font-bold text-gray-900">{slot.date}</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <span className="block text-xs text-blue-500 font-bold uppercase">
                    Time
                  </span>
                  <span className="font-bold text-gray-900">{slot.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                <Video size={16} />
                <span>Session will be held via secure video call.</span>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button className="flex-1" onClick={() => setStep(3)}>
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
