import React from "react";
import { Button } from "./Button";
import { WifiOff, AlertTriangle, RefreshCcw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  fullScreen?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "We couldn't load that information. Let's try that again.",
  onRetry,
  onGoBack,
  fullScreen = false,
}) => {
  const Content = (
    <div className="text-center max-w-sm mx-auto p-6 animate-in fade-in zoom-in duration-300">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle size={32} />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-8 leading-relaxed">{message}</p>

      <div className="flex flex-col gap-3">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCcw size={16} /> Try Again
          </Button>
        )}
        {onGoBack && (
          <Button variant="ghost" onClick={onGoBack} className="w-full">
            Go Back
          </Button>
        )}
        <button className="text-xs text-gray-400 hover:text-gray-600 underline mt-2">
          Contact Support
        </button>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        {Content}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-100 py-12">
      {Content}
    </div>
  );
};
