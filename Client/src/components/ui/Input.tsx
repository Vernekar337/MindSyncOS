import React from "react";
import { cn } from "../../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {/* Section 4.3: Iconography inside inputs */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            // Section 4.1: Color System (bg-white, border-gray-200)
            // Section 4.2: Typography (text-sm, text-text-main)
            "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-main placeholder:text-text-muted transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            icon ? "pl-10" : "",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
