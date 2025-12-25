import React from "react";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "danger" | "outline";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    outline: "bg-transparent border border-gray-200 text-gray-600",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${variants[variant]}`}
    >
      {children}
    </span>
  );
};
