"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaHeart,
  FaComment,
  FaShare,
  FaEllipsisH,
  FaRunning,
  FaMapMarkerAlt,
  FaClock,
  FaCalendar,
} from "react-icons/fa";
import { Activity } from "@/lib/store";
import { Button, Card, Avatar, Badge } from "@/components/ui";
import { ActivityStats } from "@/components/activities";
import {
  formatDistance,
  formatDuration,
  formatRelativeTime,
  cn,
} from "@/lib/utils";

// Mock activity data
const mockActivity: Activity = {
  id: 1,
  user_id: 1,
  title: "Morning Run in Central Park",
  description:
    "Beautiful morning run with perfect weather! The sunrise was amazing and the park was relatively empty. Perfect conditions for a tempo run. Felt strong throughout and managed to hit all my target paces.",
  activity_type: "run",
  status: "completed",
  distance: 8500,
  duration: 2580,
  elevation_gain: 120,
  elevation_loss: 115,
  calories: 650,
  avg_speed: 3.29,
  max_speed: 4.2,
  avg_heart_rate: 155,
  max_heart_rate: 178,
  started_at: new Date(Date.now() - 3600000).toISOString(),
  completed_at: new Date().toISOString(),
  kudos_count: 24,
  comments_count: 5,
  has_kudos: false,
  user: {
    id: 1,
    email: "john@example.com",
    username: "johndoe",
    full_name: "John Doe",
    created_at: new Date().toISOString(),
  },
};

const mockComments = [
  {
    id: 1,
    user: { username: "sarahw", full_name: "Sarah Wilson" },
    content: "Great run! 🏃‍♂️",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    user: { username: "mikechen", full_name: "Mike Chen" },
    content: "Those splits are impressive!",
    created_at: new Date().toISOString(),
  },
];

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activity, setActivity] = useState<Activity>(mockActivity);
  const [newComment, setNewComment] = useState("");

  const handleKudos = () => {
    setActivity((prev) => ({
      ...prev,
      has_kudos: !prev.has_kudos,
      kudos_count: prev.has_kudos
        ? (prev.kudos_count || 1) - 1
        : (prev.kudos_count || 0) + 1,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        leftIcon={<FaArrowLeft />}
      >
        Back
      </Button>

      {/* Main Content */}
      <Card variant="glass">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {activity.user && (
              <Link href={`/profile/${activity.user.username}`}>
                <Avatar
                  src={activity.user.profile_picture}
                  name={activity.user.full_name || activity.user.username}
                  size="lg"
                />
              </Link>
            )}
            <div>
              {activity.user && (
                <Link
                  href={`/profile/${activity.user.username}`}
                  className="font-semibold text-lg text-white hover:text-orange-500 transition-colors"
                >
                  {activity.user.full_name || activity.user.username}
                </Link>
              )}
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <span className="flex items-center gap-1">
                  <FaCalendar className="text-xs" />
                  {formatRelativeTime(activity.started_at)}
                </span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-xs" />
                  Central Park, NYC
                </span>
              </div>
            </div>
          </div>
          <button className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
            <FaEllipsisH />
          </button>
        </div>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500">
              <FaRunning className="text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">{activity.title}</h1>
          </div>
          <Badge variant="orange">
            {activity.activity_type.charAt(0).toUpperCase() +
              activity.activity_type.slice(1)}
          </Badge>
        </div>

        {/* Map Placeholder */}
        <div className="h-64 rounded-xl bg-gray-800/50 mb-6 overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
            <div className="text-center">
              <FaMapMarkerAlt className="text-4xl mx-auto mb-2" />
              <span className="text-sm">Map View</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Activity Stats
          </h2>
          <ActivityStats activity={activity} />
        </div>

        {/* Description */}
        {activity.description && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-2">
              Description
            </h2>
            <p className="text-gray-400">{activity.description}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-700/50">
          <button
            onClick={handleKudos}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all",
              activity.has_kudos
                ? "bg-red-500/10 text-red-500"
                : "text-gray-400 hover:text-red-500 hover:bg-red-500/10"
            )}
          >
            <FaHeart className={activity.has_kudos ? "fill-current" : ""} />
            <span className="font-medium">
              {activity.kudos_count || 0} Kudos
            </span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 transition-all">
            <FaComment />
            <span className="font-medium">
              {activity.comments_count || 0} Comments
            </span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-400 hover:text-green-500 hover:bg-green-500/10 transition-all ml-auto">
            <FaShare />
            <span className="font-medium">Share</span>
          </button>
        </div>
      </Card>

      {/* Comments Section */}
      <Card variant="glass">
        <h2 className="text-lg font-semibold text-white mb-4">Comments</h2>

        {/* Comment Input */}
        <div className="flex gap-3 mb-6">
          <Avatar name="You" size="sm" />
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Button size="sm" disabled={!newComment.trim()}>
              Post
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {mockComments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar name={comment.user.full_name} size="sm" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">
                    {comment.user.full_name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatRelativeTime(comment.created_at)}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
