import React from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Star, Calendar, Clock } from "lucide-react";

interface DoctorProps {
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  nextAvailable: string;
  image: string;
  price: string;
}

export const DoctorCard: React.FC<DoctorProps> = ({
  name,
  specialty,
  rating,
  reviews,
  nextAvailable,
  image,
  price,
}) => {
  return (
    <Card className="flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
      {/* Doctor Image */}
      <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-text-main">{name}</h3>
            <p className="text-primary font-medium">{specialty}</p>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
            <Star size={16} className="text-amber-500 fill-amber-500" />
            <span className="font-bold text-amber-700">{rating}</span>
            <span className="text-xs text-amber-600">({reviews})</span>
          </div>
        </div>

        <p className="text-text-muted text-sm mt-3 line-clamp-2">
          Specializes in CBT, anxiety management, and trauma recovery. Dedicated
          to creating a safe, non-judgmental space.
        </p>

        <div className="flex items-center gap-4 mt-4 text-sm text-text-muted">
          <div className="flex items-center gap-1">
            <Calendar size={16} /> {nextAvailable}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} /> 50 min session
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center gap-3 min-w-[160px]">
        <div className="text-center md:text-right mb-2">
          <span className="text-2xl font-bold text-text-main">{price}</span>
          <span className="text-xs text-text-muted"> / session</span>
        </div>
        <Button className="w-full">Book Now</Button>
        <Button variant="outline" className="w-full">
          View Profile
        </Button>
      </div>
    </Card>
  );
};
