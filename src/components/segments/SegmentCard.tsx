"use client";

import React from "react";
import Link from "next/link";
import { FaTrophy, FaMountain, FaUsers } from "react-icons/fa";
import { Segment } from "@/lib/store";
import { formatDistance, formatElevation, cn } from "@/lib/utils";
import { Card, Badge } from "@/components/ui";

export interface SegmentCardProps {
  segment: Segment;
}

const SegmentCard: React.FC<SegmentCardProps> = ({ segment }) => {
  return (
    <Link href={`/segments/${segment.id}`}>
      <Card variant="glass" hover className="group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500">
              <FaTrophy className="text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white group-hover:text-orange-500 transition-colors">
                {segment.name}
              </h3>
              <Badge variant="orange" size="sm">
                {segment.activity_type.charAt(0).toUpperCase() +
                  segment.activity_type.slice(1)}
              </Badge>
            </div>
          </div>
        </div>

        {segment.description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {segment.description}
          </p>
        )}

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 rounded-xl bg-gray-800/30">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Distance
            </p>
            <p className="text-lg font-bold text-white">
              {formatDistance(segment.distance)}
            </p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gray-800/30">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Elevation
            </p>
            <p className="text-lg font-bold text-white">
              {formatElevation(segment.elevation_gain)}
            </p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gray-800/30">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Avg Grade
            </p>
            <p className="text-lg font-bold text-white">
              {segment.avg_grade.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-2 text-gray-400">
            <FaUsers />
            <span className="text-sm">
              {segment.efforts_count || 0} efforts
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaMountain />
            <span className="text-sm">View Leaderboard</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default SegmentCard;
