import React, { useState } from "react";
import { DoctorCard } from "../components/ui/DoctorCard";
import { Button } from "../components/ui/Button";
import { Search, SlidersHorizontal } from "lucide-react";

const Appointments = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      specialty: "Anxiety & Depression",
      rating: 4.9,
      reviews: 124,
      nextAvailable: "Tomorrow, 10:00 AM",
      price: "$120",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      name: "Dr. James Carter",
      specialty: "Trauma & PTSD",
      rating: 4.8,
      reviews: 89,
      nextAvailable: "Today, 4:30 PM",
      price: "$140",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      name: "Dr. Emily Wong",
      specialty: "Family Therapy",
      rating: 5.0,
      reviews: 62,
      nextAvailable: "Wed, Oct 28",
      price: "$110",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-text-main">Find a Therapist</h2>
        <p className="text-text-muted">
          Connect with professionals who understand your needs.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name or specialty..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal size={18} /> Filters
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {["All", "Anxiety", "Depression", "Trauma", "Family", "Stress"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "bg-white text-text-muted hover:bg-gray-50 border border-gray-100"
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>

      {/* Doctor List */}
      <div className="space-y-4">
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} {...doc} />
        ))}
      </div>
    </div>
  );
};

export default Appointments;
