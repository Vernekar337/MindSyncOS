import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
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
      <textarea
        className={`
          w-full px-3 py-2 bg-white border rounded-xl text-sm transition-all outline-none
          focus:ring-2 focus:ring-primary/20 focus:border-primary
          ${error ? "border-red-500 focus:ring-red-200" : "border-gray-200"}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
