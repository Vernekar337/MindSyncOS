import React from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import {
  AlertTriangle,
  Check,
  X,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";

const Moderation = () => {
  // Mock Flagged Content
  const flaggedPosts = [
    {
      id: 1,
      author: "Anonymous",
      content: "I just want it all to end. I don't see any point anymore.",
      reason: "Self-Harm Risk",
      time: "10 mins ago",
      severity: "High",
    },
    {
      id: 2,
      author: "John Doe",
      content: "This therapist is stupid and hates everyone.",
      reason: "Harassment",
      time: "2 hours ago",
      severity: "Low",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Content Moderation
          </h1>
          <p className="text-gray-500">
            Review flagged content and maintain community safety.
          </p>
        </div>
        <Badge variant="warning">{flaggedPosts.length} Pending</Badge>
      </div>

      <div className="space-y-4">
        {flaggedPosts.map((post) => (
          <Card key={post.id} className="border-l-4 border-l-amber-500">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert size={18} className="text-amber-500" />
                <span className="font-bold text-gray-900">
                  Flagged: {post.reason}
                </span>
                <Badge
                  variant={post.severity === "High" ? "danger" : "warning"}
                >
                  {post.severity}
                </Badge>
              </div>
              <span className="text-xs text-gray-400">{post.time}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <MessageSquare size={14} /> Posted by {post.author}
              </div>
              <p className="text-gray-800 font-medium">"{post.content}"</p>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="danger"
                size="sm"
                className="flex items-center gap-2"
              >
                <AlertTriangle size={16} /> Escalate to Crisis Team
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white border-red-200 text-red-600 hover:bg-red-50"
              >
                <X size={16} className="mr-1" /> Delete
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <Check size={16} /> Approve
              </Button>
            </div>
          </Card>
        ))}

        {flaggedPosts.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
            <Check size={48} className="mx-auto mb-4 text-green-200" />
            <p>All clear! No pending flags.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Moderation;
