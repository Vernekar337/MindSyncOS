import React from "react";
import { cn } from "../../utils/cn";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-background-elevated rounded-xl shadow-sm border border-gray-100 p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
