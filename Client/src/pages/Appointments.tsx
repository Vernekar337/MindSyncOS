import React from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Star, Clock, Filter, SlidersHorizontal } from "lucide-react";

export const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    specialty: "Clinical Psychologist",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    rating: 4.9,
    reviews: 120,
    tags: ["Anxiety", "Depression", "CBT"],
    nextAvailable: "Today, 4:00 PM",
    bio: "Specialist in cognitive behavioral therapy with 10+ years of experience helping patients manage anxiety.",
  },
  {
    id: 2,
    name: "Dr. James Carter",
    specialty: "Psychiatrist",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300",
    rating: 4.8,
    reviews: 85,
    tags: ["Medication", "ADHD", "Sleep"],
    nextAvailable: "Tomorrow, 10:00 AM",
    bio: "Focused on holistic medication management and sleep disorders.",
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    specialty: "Therapist",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300",
    rating: 5.0,
    reviews: 42,
    tags: ["Trauma", "Mindfulness"],
    nextAvailable: "Wed, 2:30 PM",
    bio: "Compassionate trauma-informed care using mindfulness techniques.",
  },
];

const Appointments = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Filters Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">
            Find a Therapist
          </h1>
          <p className="text-text-muted">
            Book a session with a professional who understands you.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-2 text-sm">
            <Filter size={16} /> Filters
          </Button>
          <Button variant="outline" className="flex gap-2 text-sm">
            <SlidersHorizontal size={16} /> Sort
          </Button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          "All Specialists",
          "Anxiety",
          "Depression",
          "Available Today",
          "Female",
          "Male",
        ].map((filter, i) => (
          <button
            key={i}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm border transition-colors ${
              i === 0
                ? "bg-primary text-white border-primary"
                : "bg-white border-gray-200 text-text-muted hover:border-primary/50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <Card
            key={doc.id}
            className="flex flex-col hover:shadow-lg transition-shadow border-gray-200"
          >
            {/* Header: Avatar & Name */}
            <div className="flex items-start gap-4 mb-4">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <div>
                <h3 className="font-bold text-text-main text-lg">{doc.name}</h3>
                <p className="text-sm text-text-muted">{doc.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-gray-700">
                    {doc.rating}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({doc.reviews} sessions)
                  </span>
                </div>
              </div>
            </div>

            {/* Bio & Tags */}
            <div className="mb-4 flex-1">
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {doc.bio}
              </p>
              <div className="flex flex-wrap gap-1">
                {doc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer: Availability & CTA */}
            <div className="pt-4 border-t border-gray-100 mt-auto">
              <div className="flex items-center gap-2 text-xs font-medium text-green-600 mb-3 bg-green-50 w-fit px-2 py-1 rounded">
                <Clock size={12} /> Next available: {doc.nextAvailable}
              </div>
              <Button
                className="w-full"
                onClick={() => navigate(`/appointments/${doc.id}`)}
              >
                View & Book
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
