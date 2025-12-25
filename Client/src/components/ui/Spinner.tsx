import React from "react";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  label?: string; // Optional text for "AI analyzing..." context
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  label,
  className = "",
}) => {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 48,
    xl: 64,
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <Loader2 className="animate-spin text-primary" size={sizes[size]} />
      {label && (
        <p className="text-sm font-medium text-text-muted animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
};
