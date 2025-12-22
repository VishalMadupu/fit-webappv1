"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaPlus, FaFilter, FaSearch } from "react-icons/fa";
import { Activity } from "@/lib/store";
import { Button, Input, Card, Badge } from "@/components/ui";
import { ActivityList } from "@/components/activities";

// Mock data
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
    started_at: new Date(Date.now() - 3600000).toISOString(),
    kudos_count: 24,
    comments_count: 5,
  },
  {
    id: 2,
    user_id: 1,
    title: "Evening Bike Ride",
    activity_type: "ride",
    status: "completed",
    distance: 25000,
    duration: 3600,
    elevation_gain: 280,
    elevation_loss: 275,
    calories: 800,
    avg_speed: 6.94,
    max_speed: 12.5,
    started_at: new Date(Date.now() - 86400000).toISOString(),
    kudos_count: 18,
    comments_count: 3,
  },
  {
    id: 3,
    user_id: 1,
    title: "Trail Hike",
    activity_type: "hike",
    status: "completed",
    distance: 12000,
    duration: 7200,
    elevation_gain: 450,
    elevation_loss: 440,
    calories: 900,
    avg_speed: 1.67,
    max_speed: 2.5,
    started_at: new Date(Date.now() - 172800000).toISOString(),
    kudos_count: 32,
    comments_count: 7,
  },
];

const activityFilters = [
  { value: "all", label: "All" },
  { value: "run", label: "Run" },
  { value: "ride", label: "Ride" },
  { value: "swim", label: "Swim" },
  { value: "hike", label: "Hike" },
  { value: "walk", label: "Walk" },
];

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || activity.activity_type === activeFilter;
    return matchesSearch && matchesFilter;
  });

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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-white">My Activities</h1>
          <p className="text-gray-400 mt-1">
            {activities.length} total activities
          </p>
        </div>
        <Link href="/activities/new">
          <Button leftIcon={<FaPlus />}>New Activity</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card variant="glass" padding="md">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1">
            <Input
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<FaSearch />}
            />
          </div>
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar">
            {activityFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter.value
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Activity List */}
      <ActivityList
        activities={filteredActivities}
        isLoading={isLoading}
        showUser={false}
        onKudos={handleKudos}
        emptyMessage={
          searchQuery || activeFilter !== "all"
            ? "No matching activities found"
            : "No activities yet"
        }
      />
    </div>
  );
}
