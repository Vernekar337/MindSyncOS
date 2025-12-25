import React from "react";
import { Card } from "./Card";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  ShieldCheck,
} from "lucide-react";
import { Button } from "./Button";

interface PostProps {
  author: string;
  role: "Patient" | "Doctor" | "Moderator";
  time: string;
  category: string;
  content: string;
  likes: number;
  comments: number;
  isAnonymous?: boolean;
}

export const PostCard: React.FC<PostProps> = ({
  author,
  role,
  time,
  category,
  content,
  likes,
  comments,
  isAnonymous,
}) => {
  return (
    <Card className="p-0 overflow-hidden mb-4 hover:shadow-md transition-shadow">
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
              ${isAnonymous ? "bg-gray-400" : "bg-primary"}`}
            >
              {isAnonymous ? "?" : author[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-text-main">
                  {isAnonymous ? "Anonymous Member" : author}
                </h4>
                {role === "Moderator" && (
                  <ShieldCheck size={14} className="text-blue-500" />
                )}
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] text-text-muted uppercase font-bold tracking-wide">
                  {category}
                </span>
              </div>
              <p className="text-xs text-text-muted">{time}</p>
            </div>
          </div>
          <button className="text-text-muted hover:text-text-main">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Content */}
        <p className="text-text-main leading-relaxed mb-4 whitespace-pre-line">
          {content}
        </p>

        {/* Footer Actions */}
        <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
          <button className="flex items-center gap-2 text-text-muted hover:text-pink-500 transition-colors text-sm font-medium">
            <Heart size={18} /> {likes}
          </button>
          <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm font-medium">
            <MessageCircle size={18} /> {comments}
          </button>
          <button className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors text-sm font-medium ml-auto">
            <Share2 size={18} /> Share
          </button>
        </div>
      </div>
    </Card>
  );
};
