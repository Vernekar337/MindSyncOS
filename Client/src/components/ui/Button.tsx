import React from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  ...props
}) => {
  // Principle 4: Large targets & Keyboard navigation friendly
  // Principle 9: 150-250ms transition
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const variants = {
    // Principle 1: Calm & Supportive Colors
    primary:
      "bg-primary text-white hover:bg-primary-hover shadow-md shadow-primary/20 border border-transparent",
    secondary:
      "bg-secondary text-white hover:bg-secondary-hover shadow-md shadow-secondary/20 border border-transparent",
    outline:
      "border-2 border-gray-200 bg-transparent hover:border-primary/50 hover:bg-primary/5 text-text-main",
    ghost:
      "bg-transparent hover:bg-gray-100 text-text-muted hover:text-text-main",
    // Principle 3: Safety First (Controlled Red)
    danger:
      "bg-status-danger text-white hover:bg-red-600 shadow-md shadow-red-500/20",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs uppercase tracking-wide", // Caption style
    md: "h-11 px-5 text-sm", // Standard Body style
    lg: "h-14 px-8 text-base", // Hero Actions
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
};
