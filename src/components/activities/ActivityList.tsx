"use client";

import React from "react";
import { Activity } from "@/lib/store";
import ActivityCard from "./ActivityCard";
import { SkeletonActivityCard } from "@/components/ui";

export interface ActivityListProps {
  activities: Activity[];
  isLoading?: boolean;
  showUser?: boolean;
  onKudos?: (activityId: number) => void;
  onComment?: (activityId: number) => void;
  emptyMessage?: string;
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  isLoading = false,
  showUser = true,
  onKudos,
  onComment,
  emptyMessage = "No activities yet",
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <SkeletonActivityCard key={i} />
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
          <span className="text-4xl">🏃</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-400">
          Start tracking your activities to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          showUser={showUser}
          onKudos={onKudos}
          onComment={onComment}
        />
      ))}
    </div>
  );
};

export default ActivityList;
