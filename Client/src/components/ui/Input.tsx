import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ElementType; // Use React.ElementType for Components
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon: Icon,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-main mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`
            w-full bg-white border rounded-xl text-sm transition-all outline-none
            ${Icon ? "pl-10 pr-4 py-2" : "px-4 py-2"}
            focus:ring-2 focus:ring-primary/20 focus:border-primary
            ${error ? "border-red-500 focus:ring-red-200" : "border-gray-200"}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
