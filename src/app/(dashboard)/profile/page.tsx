"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaCamera,
  FaMapMarkerAlt,
  FaCalendar,
  FaRunning,
  FaCog,
  FaEdit,
} from "react-icons/fa";
import { useAuthStore, Activity } from "@/lib/store";
import { Card, Button, Avatar, Badge, StatCard } from "@/components/ui";
import { ActivityList } from "@/components/activities";
import { formatDistance, formatDuration, cn } from "@/lib/utils";

// Mock user stats
const userStats = {
  totalActivities: 156,
  totalDistance: 1250000,
  totalDuration: 432000,
  totalElevation: 12500,
  followers: 234,
  following: 189,
};

// Mock activities
const mockActivities: Activity[] = [
  {
    id: 1,
    user_id: 1,
    title: "Morning Run",
    activity_type: "run",
    status: "completed",
    distance: 8500,
    duration: 2580,
    elevation_gain: 120,
    elevation_loss: 115,
    calories: 650,
    avg_speed: 3.29,
    max_speed: 4.2,
    started_at: new Date(Date.now() - 3600000).toISOString(),
    kudos_count: 24,
    comments_count: 5,
  },
];

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"activities" | "stats">(
    "activities"
  );

  const displayUser = user || {
    username: "johndoe",
    full_name: "John Doe",
    bio: "Passionate runner and cyclist. Training for my first marathon! 🏃‍♂️",
    location: "New York, NY",
    created_at: "2023-01-15",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card variant="glass" className="relative overflow-hidden">
        {/* Cover Photo Placeholder */}
        <div className="h-32 bg-gradient-to-r from-orange-500/20 to-red-500/20 -mx-6 -mt-6 mb-4" />

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 relative z-10">
          {/* Avatar */}
          <div className="relative">
            <Avatar
              name={displayUser.full_name || displayUser.username}
              size="xl"
              showBorder
            />
            <button className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
              <FaCamera className="text-sm" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {displayUser.full_name || displayUser.username}
                </h1>
                <p className="text-gray-400">@{displayUser.username}</p>
              </div>
              <div className="flex gap-3">
                <Link href="/settings">
                  <Button variant="outline" size="sm" leftIcon={<FaCog />}>
                    Settings
                  </Button>
                </Link>
                <Button size="sm" leftIcon={<FaEdit />}>
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bio and Info */}
        <div className="mt-6 space-y-3">
          {displayUser.bio && (
            <p className="text-gray-300">{displayUser.bio}</p>
          )}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            {displayUser.location && (
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-xs" />
                {displayUser.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <FaCalendar className="text-xs" />
              Joined{" "}
              {new Date(displayUser.created_at).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-6 mt-6 pt-6 border-t border-gray-700/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {userStats.totalActivities}
            </p>
            <p className="text-sm text-gray-400">Activities</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {userStats.followers}
            </p>
            <p className="text-sm text-gray-400">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {userStats.following}
            </p>
            <p className="text-sm text-gray-400">Following</p>
          </div>
        </div>
      </Card>

      {/* Content Tabs */}
      <div className="flex gap-2 border-b border-gray-800">
        {[
          { key: "activities" as const, label: "Activities", icon: FaRunning },
          { key: "stats" as const, label: "Statistics", icon: FaRunning },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 -mb-[2px]",
              activeTab === tab.key
                ? "text-orange-500 border-orange-500"
                : "text-gray-400 border-transparent hover:text-white"
            )}
          >
            <tab.icon />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "activities" && (
        <ActivityList
          activities={mockActivities}
          showUser={false}
          emptyMessage="No activities yet"
        />
      )}

      {activeTab === "stats" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Activities"
            value={userStats.totalActivities.toString()}
            icon={<FaRunning className="text-xl" />}
          />
          <StatCard
            label="Total Distance"
            value={formatDistance(userStats.totalDistance)}
            icon={<FaRunning className="text-xl" />}
          />
          <StatCard
            label="Total Time"
            value={formatDuration(userStats.totalDuration)}
            icon={<FaRunning className="text-xl" />}
          />
          <StatCard
            label="Total Elevation"
            value={`${(userStats.totalElevation / 1000).toFixed(1)}k m`}
            icon={<FaRunning className="text-xl" />}
          />
        </div>
      )}
    </div>
  );
}
