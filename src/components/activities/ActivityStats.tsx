"use client";

import React from "react";
import {
  FaRoad,
  FaClock,
  FaTachometerAlt,
  FaMountain,
  FaFire,
  FaHeartbeat,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { Activity } from "@/lib/store";
import {
  formatDistance,
  formatDuration,
  formatPace,
  formatSpeed,
  formatElevation,
  formatCalories,
  cn,
} from "@/lib/utils";
import { Card, StatCard } from "@/components/ui";

export interface ActivityStatsProps {
  activity: Activity;
  layout?: "grid" | "row";
  size?: "sm" | "md" | "lg";
}

const ActivityStats: React.FC<ActivityStatsProps> = ({
  activity,
  layout = "grid",
  size = "md",
}) => {
  const stats = [
    {
      label: "Distance",
      value: formatDistance(activity.distance),
      icon: <FaRoad />,
      color: "orange",
    },
    {
      label: "Duration",
      value: formatDuration(activity.duration),
      icon: <FaClock />,
      color: "blue",
    },
    {
      label: "Avg Pace",
      value: formatPace(activity.avg_speed),
      icon: <FaTachometerAlt />,
      color: "green",
    },
    {
      label: "Elevation Gain",
      value: formatElevation(activity.elevation_gain),
      icon: <FaArrowUp />,
      color: "purple",
      show: activity.elevation_gain > 0,
    },
    {
      label: "Elevation Loss",
      value: formatElevation(activity.elevation_loss),
      icon: <FaArrowDown />,
      color: "red",
      show: activity.elevation_loss > 0,
    },
    {
      label: "Calories",
      value: formatCalories(activity.calories),
      icon: <FaFire />,
      color: "yellow",
      show: activity.calories > 0,
    },
    {
      label: "Avg Heart Rate",
      value: `${activity.avg_heart_rate} bpm`,
      icon: <FaHeartbeat />,
      color: "red",
      show: !!activity.avg_heart_rate,
    },
    {
      label: "Max Heart Rate",
      value: `${activity.max_heart_rate} bpm`,
      icon: <FaHeartbeat />,
      color: "pink",
      show: !!activity.max_heart_rate,
    },
    {
      label: "Max Speed",
      value: formatSpeed(activity.max_speed),
      icon: <FaTachometerAlt />,
      color: "cyan",
      show: activity.max_speed > 0,
    },
  ].filter((stat) => stat.show !== false);

  const gridCols = {
    sm: "grid-cols-2",
    md: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    lg: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  };

  if (layout === "row") {
    return (
      <div className="flex items-center gap-6 overflow-x-auto pb-2">
        {stats.slice(0, 4).map((stat, index) => (
          <div key={index} className="flex-shrink-0 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {stat.label}
            </p>
            <p className="text-lg font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4", gridCols[size])}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          size={size}
        />
      ))}
    </div>
  );
};

export default ActivityStats;
