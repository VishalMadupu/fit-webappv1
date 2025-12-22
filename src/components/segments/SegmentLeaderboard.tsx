"use client";

import React from "react";
import Link from "next/link";
import { FaCrown, FaMedal, FaAward, FaTrophy } from "react-icons/fa";
import { SegmentEffort } from "@/lib/store";
import {
  formatDuration,
  formatSpeed,
  formatRelativeTime,
  cn,
} from "@/lib/utils";
import { Avatar, Card, Badge } from "@/components/ui";

export interface SegmentLeaderboardProps {
  efforts: SegmentEffort[];
  currentUserId?: number;
  limit?: number;
}

const rankIcons = [
  { icon: FaCrown, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { icon: FaMedal, color: "text-gray-300", bg: "bg-gray-500/10" },
  { icon: FaAward, color: "text-amber-600", bg: "bg-amber-600/10" },
];

const SegmentLeaderboard: React.FC<SegmentLeaderboardProps> = ({
  efforts,
  currentUserId,
  limit = 10,
}) => {
  const displayedEfforts = efforts.slice(0, limit);

  return (
    <Card variant="default" padding="none">
      <div className="p-4 sm:p-5 border-b border-gray-700/50">
        <h3 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          Leaderboard
        </h3>
      </div>

      <div className="divide-y divide-gray-700/30">
        {displayedEfforts.map((effort, index) => {
          const isCurrentUser = effort.user.id === currentUserId;
          const rankStyle = rankIcons[index] || null;
          const RankIcon = rankStyle?.icon;

          return (
            <div
              key={effort.id}
              className={cn(
                "flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition-colors",
                isCurrentUser ? "bg-orange-500/5" : "hover:bg-gray-800/30"
              )}
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-8 sm:w-10 text-center">
                {RankIcon ? (
                  <div
                    className={cn(
                      "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto",
                      rankStyle.bg
                    )}
                  >
                    <RankIcon
                      className={cn("text-base sm:text-lg", rankStyle.color)}
                    />
                  </div>
                ) : (
                  <span className="text-base sm:text-lg font-bold text-gray-400">
                    {effort.rank}
                  </span>
                )}
              </div>

              {/* User */}
              <Link
                href={`/profile/${effort.user.username}`}
                className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0"
              >
                <Avatar
                  src={effort.user.profile_picture}
                  name={effort.user.full_name || effort.user.username}
                  size="sm"
                />
                <div className="min-w-0">
                  <p
                    className={cn(
                      "font-medium truncate text-sm sm:text-base",
                      isCurrentUser
                        ? "text-orange-500"
                        : "text-white hover:text-orange-500"
                    )}
                  >
                    {effort.user.full_name || effort.user.username}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                    {formatRelativeTime(effort.started_at)}
                  </p>
                </div>
              </Link>

              {/* Stats */}
              <div className="flex items-center gap-3 sm:gap-4 text-right flex-shrink-0">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    {formatDuration(effort.elapsed_time)}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">Time</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs sm:text-sm font-medium text-gray-400">
                    {formatSpeed(effort.avg_speed)}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    Avg Speed
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                {effort.is_kom && (
                  <Badge variant="warning" size="sm">
                    KOM
                  </Badge>
                )}
                {effort.is_pr && (
                  <Badge variant="success" size="sm">
                    PR
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {efforts.length > limit && (
        <div className="p-3 sm:p-4 border-t border-gray-700/50 text-center">
          <button className="text-xs sm:text-sm text-orange-500 hover:text-orange-400 font-medium">
            View all {efforts.length} efforts
          </button>
        </div>
      )}
    </Card>
  );
};

export default SegmentLeaderboard;
