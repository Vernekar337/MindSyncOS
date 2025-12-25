import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "busy";
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size = "md",
  status,
}) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-lg",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
  };

  return (
    <div className="relative inline-block">
      <div
        className={`${sizes[size]} rounded-full overflow-hidden flex items-center justify-center bg-primary/10 text-primary font-bold border border-white shadow-sm`}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span>{fallback}</span>
        )}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${statusColors[status]}`}
        ></span>
      )}
    </div>
  );
};
