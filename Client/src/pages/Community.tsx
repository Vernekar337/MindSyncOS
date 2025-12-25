import React, { useState, useEffect } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  User,
  Ghost,
  ShieldAlert,
  AlertTriangle,
  RefreshCcw,
  HandHeart,
  Smile,
} from "lucide-react";

interface Post {
  id: number;
  author: string;
  avatar?: string;
  isAnonymous: boolean;
  role?: string;
  time: string;
  category: "Support" | "Question" | "Success" | "Tip";
  content: string;
  likes: number;
  hugs: number;
  replies: number;
  status: "published" | "pending";
}

const Community = () => {
  const [user] = useState(
    JSON.parse(localStorage.getItem("mindSyncUser") || "{}")
  );

  // State for Composer
  const [postContent, setPostContent] = useState("");
  const [isAnon, setIsAnon] = useState(false);
  const [category, setCategory] = useState<
    "Support" | "Question" | "Success" | "Tip"
  >("Support");
  const [safetyWarning, setSafetyWarning] = useState(false);

  // State for Feed
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Sarah Jenkins",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
      isAnonymous: false,
      role: "Patient",
      time: "2 hours ago",
      category: "Success",
      content:
        "Finally managed to meditate for 10 minutes without checking my phone! It's a small win, but I feel so much calmer today.",
      likes: 12,
      hugs: 5,
      replies: 3,
      status: "published",
    },
    {
      id: 2,
      author: "Anonymous",
      isAnonymous: true,
      time: "4 hours ago",
      category: "Question",
      content:
        "Does anyone else feel anxious specifically on Sunday evenings? Just dreading the week ahead and not sure how to cope.",
      likes: 8,
      hugs: 15,
      replies: 7,
      status: "published",
    },
  ]);

  // Real-time simulation
  const [incomingPosts, setIncomingPosts] = useState(0);

  // Simulate incoming posts after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIncomingPosts(2);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const loadNewPosts = () => {
    const newMockPost: Post = {
      id: Date.now(),
      author: "Dr. Mitchell",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100",
      isAnonymous: false,
      role: "Doctor",
      time: "Just now",
      category: "Tip",
      content:
        "Remember to stay hydrated today. Dehydration often mimics anxiety symptoms!",
      likes: 45,
      hugs: 10,
      replies: 0,
      status: "published",
    };
    setPosts((prev) => [newMockPost, ...prev]);
    setIncomingPosts(0);
  };

  const handlePost = () => {
    if (!postContent.trim()) return;

    // Safety UX: Simple keyword detection
    const harmfulKeywords = ["hurt", "die", "stupid", "hate", "kill"];
    const isHarmful = harmfulKeywords.some((word) =>
      postContent.toLowerCase().includes(word)
    );

    if (isHarmful) {
      setSafetyWarning(true);
      // Create a "Pending" post
      const newPost: Post = {
        id: Date.now(),
        author: user.name || "User",
        isAnonymous: isAnon,
        time: "Just now",
        category: category,
        content: postContent,
        likes: 0,
        hugs: 0,
        replies: 0,
        status: "pending", // <--- Key logic
      };
      setPosts((prev) => [newPost, ...prev]);
      setPostContent("");
    } else {
      setSafetyWarning(false);
      // Create Published post
      const newPost: Post = {
        id: Date.now(),
        author: isAnon ? "Anonymous" : user.name || "User",
        isAnonymous: isAnon,
        time: "Just now",
        category: category,
        content: postContent,
        likes: 0,
        hugs: 0,
        replies: 0,
        status: "published",
      };
      setPosts((prev) => [newPost, ...prev]);
      setPostContent("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-main">Community Support</h1>
        <p className="text-text-muted">
          A safe space to share wins, tough moments, and find support.
        </p>
      </div>

      {/* 2. Composer Card */}
      <Card className="p-4 border-t-4 border-t-primary">
        <div className="flex gap-4">
          {/* Avatar or Anon Icon */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              isAnon ? "bg-gray-800 text-white" : "bg-primary/10 text-primary"
            }`}
          >
            {isAnon ? (
              <Ghost size={20} />
            ) : (
              <span className="font-bold text-lg">{user.name?.[0] || "U"}</span>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <textarea
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all"
              placeholder="Share a small win, a tough moment, or ask for support..."
              rows={3}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />

            {/* Safety Warning UX */}
            {safetyWarning && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 shrink-0 mt-0.5"
                />
                <p className="text-xs text-amber-700">
                  <strong>Hold on.</strong> Some of what you wrote may be
                  sensitive. We have flagged this post for review to keep
                  everyone safe. It is visible only to you until approved.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Category Dropdown */}
                <select
                  className="text-xs font-medium bg-white border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-primary cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                >
                  <option value="Support">❤️ Support</option>
                  <option value="Question">❓ Question</option>
                  <option value="Success">🏆 Success</option>
                  <option value="Tip">💡 Tip</option>
                </select>

                {/* Anon Toggle */}
                <button
                  onClick={() => setIsAnon(!isAnon)}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                    isAnon
                      ? "text-gray-900"
                      : "text-text-muted hover:text-gray-900"
                  }`}
                >
                  {isAnon ? <Ghost size={14} /> : <User size={14} />}
                  {isAnon ? "Posting Anonymously" : "Post as yourself"}
                </button>
              </div>

              <Button
                size="sm"
                onClick={handlePost}
                disabled={!postContent.trim()}
              >
                Post to Community
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Real-Time New Posts Bar */}
      {incomingPosts > 0 && (
        <button
          onClick={loadNewPosts}
          className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-sm border border-blue-200"
        >
          <RefreshCcw size={14} /> Show {incomingPosts} new posts
        </button>
      )}

      {/* 4. Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className={`${
              post.status === "pending"
                ? "opacity-70 border-amber-200 bg-amber-50/10"
                : ""
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                {post.avatar && !post.isAnonymous ? (
                  <img
                    src={post.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      post.isAnonymous
                        ? "bg-gray-200"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {post.isAnonymous ? (
                      <Ghost size={20} className="text-gray-500" />
                    ) : (
                      <span className="font-bold">{post.author[0]}</span>
                    )}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-text-main text-sm">
                      {post.author}
                    </h4>
                    {post.status === "pending" && (
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold uppercase">
                        Pending Review
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span>{post.time}</span>
                    <span>•</span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-medium ${
                        post.category === "Success"
                          ? "bg-green-100 text-green-700"
                          : post.category === "Question"
                          ? "bg-blue-100 text-blue-700"
                          : post.category === "Tip"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-pink-100 text-pink-700"
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-text-muted hover:text-text-main">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Body */}
            <p className="text-text-main text-sm leading-relaxed mb-4">
              {post.content}
            </p>

            {/* Footer / Reactions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex gap-4">
                <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors group">
                  <Heart size={16} className="group-hover:fill-red-500" />{" "}
                  {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-primary transition-colors group">
                  <HandHeart size={16} className="group-hover:text-primary" />{" "}
                  {post.hugs} Support
                </button>
                <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-amber-500 transition-colors group">
                  <Smile size={16} className="group-hover:text-amber-500" />{" "}
                  React
                </button>
              </div>

              <button className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-main transition-colors">
                <MessageCircle size={16} /> Reply ({post.replies})
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Community;
