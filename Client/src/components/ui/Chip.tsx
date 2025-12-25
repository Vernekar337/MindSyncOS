import React from "react";
import { X } from "lucide-react";

interface ChipProps {
  label: string;
  isActive?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  isActive,
  onRemove,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide transition-all cursor-pointer select-none
        ${
          isActive
            ? "bg-primary text-white shadow-md shadow-primary/20 border border-transparent"
            : "bg-white text-text-muted border border-gray-200 hover:border-primary/50"
        }
      `}
    >
      {label}
      {onRemove && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 p-0.5 hover:bg-black/10 rounded-full"
        >
          <X size={12} />
        </span>
      )}
    </div>
  );
};
