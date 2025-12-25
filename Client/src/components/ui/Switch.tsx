import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        {/* Track */}
        <div
          className={`w-10 h-6 rounded-full transition-colors ${
            checked ? "bg-primary" : "bg-gray-200 group-hover:bg-gray-300"
          }`}
        ></div>
        {/* Thumb */}
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        ></div>
      </div>
      {label && (
        <span className="text-sm font-medium text-text-main">{label}</span>
      )}
    </label>
  );
};
