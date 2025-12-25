import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "rectangular",
  width,
  height,
}) => {
  const baseStyles = "bg-gray-200 animate-pulse rounded-md";

  const variants = {
    text: "h-4 w-full rounded",
    circular: "rounded-full",
    rectangular: "rounded-xl",
  };

  const style = {
    width: width,
    height: height,
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
    />
  );
};

// Pre-built Skeleton layouts for specific sections
export const DashboardSkeleton = () => (
  <div className="space-y-6">
    {/* Header Skeleton */}
    <div className="space-y-2">
      <Skeleton width={200} height={32} />
      <Skeleton width={300} height={20} />
    </div>

    {/* Cards Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Skeleton height={180} className="w-full" />
      <Skeleton height={180} className="w-full" />
    </div>

    {/* Metrics Row Skeleton */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} height={100} className="w-full" />
      ))}
    </div>
  </div>
);
