"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaRunning,
  FaRoad,
  FaClock,
  FaFire,
  FaMountain,
  FaPlus,
  FaArrowRight,
  FaTrophy,
} from "react-icons/fa";
import { useAuthStore, useActivityStore, Activity } from "@/lib/store";
import { Card, StatCard, Button, Avatar, Badge } from "@/components/ui";
import { ActivityList } from "@/components/activities";
import {
  formatDistance,
  formatDuration,
  formatRelativeTime,
} from "@/lib/utils";

// Mock data for demonstration
const mockActivities: Activity[] = [
  {
    id: 1,
    user_id: 1,
    title: "Morning Run in Central Park",
    description: "Beautiful morning run with perfect weather!",
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
  },
  {
    id: 2,
    user_id: 2,
    title: "Weekend Cycling Adventure",
    description: "Great ride through the countryside!",
    activity_type: "ride",
    status: "completed",
    distance: 45000,
    duration: 7200,
    elevation_gain: 450,
    elevation_loss: 445,
    calories: 1200,
    avg_speed: 6.25,
    max_speed: 12.5,
    started_at: new Date(Date.now() - 86400000).toISOString(),
    completed_at: new Date(Date.now() - 79200000).toISOString(),
    kudos_count: 42,
    comments_count: 8,
    has_kudos: true,
    user: {
      id: 2,
      email: "jane@example.com",
      username: "janesmith",
      full_name: "Jane Smith",
      created_at: new Date().toISOString(),
    },
  },
];

const weeklyStats = {
  activities: 5,
  distance: 52300,
  duration: 18900,
  calories: 3250,
  elevation: 890,
};

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [isLoading, setIsLoading] = useState(false);

  const handleKudos = (activityId: number) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === activityId
          ? {
              ...a,
              has_kudos: !a.has_kudos,
              kudos_count: a.has_kudos
                ? (a.kudos_count || 1) - 1
                : (a.kudos_count || 0) + 1,
            }
          : a
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back,{" "}
            {user?.full_name?.split(" ")[0] || user?.username || "Athlete"}! 👋
          </h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Here's your fitness overview for this week
          </p>
        </div>
        <Link href="/activities/new" className="self-start sm:self-auto">
          <Button leftIcon={<FaPlus />}>Record Activity</Button>
        </Link>
      </div>

      {/* Weekly Stats */}
      <div className="stats-grid">
        <StatCard
          label="Activities"
          value={weeklyStats.activities}
          icon={<FaRunning />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          label="Distance"
          value={formatDistance(weeklyStats.distance)}
          icon={<FaRoad />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          label="Time"
          value={formatDuration(weeklyStats.duration)}
          icon={<FaClock />}
        />
        <StatCard
          label="Calories"
          value={`${weeklyStats.calories.toLocaleString()}`}
          icon={<FaFire />}
        />
        <StatCard
          label="Elevation"
          value={`${weeklyStats.elevation} m`}
          icon={<FaMountain />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Activity Feed */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Recent Activity
            </h2>
            <Link
              href="/activities"
              className="text-orange-500 hover:text-orange-400 text-sm font-medium flex items-center gap-1"
            >
              View all <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <ActivityList
            activities={activities}
            isLoading={isLoading}
            onKudos={handleKudos}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Quick Actions */}
          <Card variant="glass">
            <h3 className="font-bold text-white mb-4 text-base sm:text-lg">
              Quick Actions
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <Link href="/activities/new" className="block">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <FaPlus className="text-sm sm:text-base" />
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base">
                    Record Activity
                  </span>
                </div>
              </Link>
              <Link href="/segments" className="block">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                    <FaTrophy className="text-sm sm:text-base" />
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base">
                    Explore Segments
                  </span>
                </div>
              </Link>
            </div>
          </Card>

          {/* Goals Progress */}
          <Card variant="glass">
            <h3 className="font-bold text-white mb-4 text-base sm:text-lg">
              Weekly Goals
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span className="text-gray-400">Distance</span>
                  <span className="text-white font-medium">52.3 / 60 km</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                    style={{ width: "87%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span className="text-gray-400">Activities</span>
                  <span className="text-white font-medium">5 / 6</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: "83%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span className="text-gray-400">Elevation</span>
                  <span className="text-white font-medium">890 / 1000 m</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: "89%" }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Suggested Athletes */}
          <Card variant="glass">
            <h3 className="font-bold text-white mb-4 text-base sm:text-lg">
              Athletes to Follow
            </h3>
            <div className="space-y-3">
              {[
                { name: "Sarah Wilson", username: "sarahw", activities: 245 },
                { name: "Mike Chen", username: "mikechen", activities: 312 },
                { name: "Emma Davis", username: "emmad", activities: 189 },
              ].map((athlete, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <Avatar name={athlete.name} size="sm" />
                    <div className="min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {athlete.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {athlete.activities} activities
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
