import React, { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  disabled,
  ...props
}) => {
  // Base Styles
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl";

  // Variants
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25 border border-transparent",
    secondary:
      "bg-white text-text-main border border-gray-200 hover:bg-gray-50 hover:border-gray-300",
    ghost:
      "bg-transparent text-text-muted hover:text-text-main hover:bg-gray-100",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
  };

  // Sizes
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};
