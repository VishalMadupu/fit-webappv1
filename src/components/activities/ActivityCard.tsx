"use client";

import React from "react";
import Link from "next/link";
import {
  FaRunning,
  FaBicycle,
  FaSwimmer,
  FaWalking,
  FaMountain,
  FaDumbbell,
  FaHeart,
  FaComment,
  FaEllipsisH,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Activity } from "@/lib/store";
import {
  formatDistance,
  formatDuration,
  formatPace,
  formatRelativeTime,
  formatElevation,
  cn,
} from "@/lib/utils";
import { Card, Avatar, Badge } from "@/components/ui";

const activityIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  run: FaRunning,
  ride: FaBicycle,
  swim: FaSwimmer,
  walk: FaWalking,
  hike: FaMountain,
  workout: FaDumbbell,
};

const activityColors: Record<string, string> = {
  run: "text-orange-500 bg-orange-500/10",
  ride: "text-cyan-500 bg-cyan-500/10",
  swim: "text-blue-500 bg-blue-500/10",
  walk: "text-green-500 bg-green-500/10",
  hike: "text-emerald-500 bg-emerald-500/10",
  workout: "text-purple-500 bg-purple-500/10",
};

export interface ActivityCardProps {
  activity: Activity;
  showUser?: boolean;
  onKudos?: (activityId: number) => void;
  onComment?: (activityId: number) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  showUser = true,
  onKudos,
  onComment,
}) => {
  const Icon = activityIcons[activity.activity_type] || FaRunning;
  const colorClass =
    activityColors[activity.activity_type] || activityColors.run;

  return (
    <Card variant="glass" hover className="overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {showUser && activity.user && (
            <Link
              href={`/profile/${activity.user.username}`}
              className="flex-shrink-0"
            >
              <Avatar
                src={activity.user.profile_picture}
                name={activity.user.full_name || activity.user.username}
                size="md"
              />
            </Link>
          )}
          <div className="min-w-0 flex-1">
            {showUser && activity.user && (
              <Link
                href={`/profile/${activity.user.username}`}
                className="font-semibold text-white hover:text-orange-500 transition-colors block truncate"
              >
                {activity.user.full_name || activity.user.username}
              </Link>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{formatRelativeTime(activity.started_at)}</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-xs" />
                <span className="truncate">NYC</span>
              </span>
            </div>
          </div>
        </div>
        <button className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all flex-shrink-0">
          <FaEllipsisH />
        </button>
      </div>

      {/* Activity Title & Type */}
      <Link href={`/activities/${activity.id}`} className="block group">
        <div className="flex items-start gap-3 mb-4">
          <div className={cn("p-2.5 rounded-xl flex-shrink-0", colorClass)}>
            <Icon className="text-xl" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-lg text-white group-hover:text-orange-500 transition-colors line-clamp-2">
              {activity.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <Badge variant="orange" size="sm">
                {activity.activity_type.charAt(0).toUpperCase() +
                  activity.activity_type.slice(1)}
              </Badge>
              {activity.status === "completed" && (
                <Badge variant="success" size="sm">
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Map Preview Placeholder */}
      {activity.polyline && (
        <div className="h-36 sm:h-44 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 mb-4 overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
            <div className="text-center">
              <FaMapMarkerAlt className="text-2xl mx-auto mb-1 opacity-50" />
              <span className="text-xs opacity-50">Route Map</span>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="activity-stats-grid mb-4">
        <div className="text-center p-3 sm:p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">
            Distance
          </p>
          <p className="text-base sm:text-lg font-bold text-white">
            {formatDistance(activity.distance)}
          </p>
        </div>
        <div className="text-center p-3 sm:p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">
            Duration
          </p>
          <p className="text-base sm:text-lg font-bold text-white">
            {formatDuration(activity.duration)}
          </p>
        </div>
        <div className="text-center p-3 sm:p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">
            Pace
          </p>
          <p className="text-base sm:text-lg font-bold text-white">
            {formatPace(activity.avg_speed)}
          </p>
        </div>
      </div>

      {/* Additional Stats */}
      {(activity.elevation_gain > 0 || activity.calories > 0) && (
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-400 mb-4">
          {activity.elevation_gain > 0 && (
            <span className="flex items-center gap-1">
              <span className="text-green-500">↑</span>{" "}
              {formatElevation(activity.elevation_gain)}
            </span>
          )}
          {activity.calories > 0 && (
            <span className="flex items-center gap-1">
              <span>🔥</span> {activity.calories} cal
            </span>
          )}
          {activity.avg_heart_rate && (
            <span className="flex items-center gap-1">
              <span className="text-red-500">❤</span> {activity.avg_heart_rate}{" "}
              bpm
            </span>
          )}
        </div>
      )}

      {/* Description */}
      {activity.description && (
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {activity.description}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-4 pt-4 border-t border-gray-700/50">
        <button
          onClick={() => onKudos?.(activity.id)}
          className={cn(
            "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all text-sm sm:text-base",
            activity.has_kudos
              ? "bg-red-500/10 text-red-500"
              : "text-gray-400 hover:text-red-500 hover:bg-red-500/10"
          )}
        >
          <FaHeart
            className={cn(
              "text-sm sm:text-base",
              activity.has_kudos ? "fill-current" : ""
            )}
          />
          <span className="font-medium">{activity.kudos_count || 0}</span>
        </button>
        <button
          onClick={() => onComment?.(activity.id)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 transition-all text-sm sm:text-base"
        >
          <FaComment className="text-sm sm:text-base" />
          <span className="font-medium">{activity.comments_count || 0}</span>
        </button>
      </div>
    </Card>
  );
};

export default ActivityCard;
