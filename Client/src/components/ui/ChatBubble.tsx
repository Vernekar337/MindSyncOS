import React from "react";
import { cn } from "../../utils/cn";

interface ChatBubbleProps {
  message: string;
  sender: "user" | "ai";
  timestamp?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  timestamp,
}) => {
  const isUser = sender === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-primary text-white rounded-br-none"
            : "bg-white border border-gray-100 text-text-main rounded-bl-none"
        )}
      >
        <p>{message}</p>
        {timestamp && (
          <p
            className={cn(
              "text-[10px] mt-1 opacity-70",
              isUser ? "text-primary-light" : "text-text-muted"
            )}
          >
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};
