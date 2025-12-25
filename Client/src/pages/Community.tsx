import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PostCard } from "../components/ui/PostCard";
import { Filter, PenLine } from "lucide-react";

const Community = () => {
  const [activeTab, setActiveTab] = useState("All");

  const posts = [
    {
      id: 1,
      author: "Sarah J.",
      role: "Patient" as const,
      time: "2 hours ago",
      category: "Success Story",
      content:
        "Finally managed to go for a 30-minute walk today after being stuck inside for a week. It feels like a small win, but I'm proud of it! 🌳",
      likes: 24,
      comments: 5,
      isAnonymous: false,
    },
    {
      id: 2,
      author: "Anonymous",
      role: "Patient" as const,
      time: "5 hours ago",
      category: "Support",
      content:
        "Having a really tough day with anxiety. Does anyone have quick grounding techniques that work for them at work?",
      likes: 12,
      comments: 8,
      isAnonymous: true,
    },
    {
      id: 3,
      author: "Dr. Mitchell",
      role: "Moderator" as const,
      time: "1 day ago",
      category: "Tip",
      content:
        "Remember: Healing isn't linear. Some days will be harder than others, and that is completely okay. Be gentle with yourselves today.",
      likes: 156,
      comments: 14,
      isAnonymous: false,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header & Composer */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-text-main">Community Feed</h2>
          <p className="text-text-muted text-sm">
            A safe space to share and support.
          </p>
        </div>
        <Button>
          <PenLine size={18} className="mr-2" /> New Post
        </Button>
      </div>

      {/* Input Card */}
      <Card className="flex gap-4 items-start">
        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
          U
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Share a small win, or ask for support..."
            className="w-full bg-transparent border-none focus:outline-none text-lg placeholder-gray-400 mb-2"
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-text-muted cursor-pointer hover:bg-gray-200">
                Success
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-text-muted cursor-pointer hover:bg-gray-200">
                Support
              </span>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-text-muted cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-primary focus:ring-primary"
                />
                Post Anonymously
              </label>
              <Button size="sm">Post</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs / Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {["All", "Support", "Success Stories", "Tips", "Questions"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${
                activeTab === tab
                  ? "bg-secondary text-white shadow-sm"
                  : "bg-white text-text-muted hover:bg-gray-50 border border-gray-100"
              }`}
            >
              {tab}
            </button>
          )
        )}
        <button className="ml-auto p-2 text-text-muted hover:bg-gray-100 rounded-full">
          <Filter size={18} />
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      <div className="text-center py-6">
        <p className="text-sm text-text-muted">
          You've caught up with everything!
        </p>
      </div>
    </div>
  );
};

export default Community;
