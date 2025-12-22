"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaTrophy, FaFilter } from "react-icons/fa";
import { Segment } from "@/lib/store";
import { Card, Input, Button } from "@/components/ui";
import { SegmentCard } from "@/components/segments";

// Mock data
const mockSegments: Segment[] = [
  {
    id: 1,
    name: "Central Park Loop Climb",
    description:
      "A challenging climb through the heart of Central Park with beautiful scenery.",
    distance: 2500,
    elevation_gain: 85,
    avg_grade: 3.4,
    activity_type: "run",
    efforts_count: 1250,
  },
  {
    id: 2,
    name: "Brooklyn Bridge Sprint",
    description: "Fast flat segment across the iconic Brooklyn Bridge.",
    distance: 1800,
    elevation_gain: 15,
    avg_grade: 0.8,
    activity_type: "ride",
    efforts_count: 3420,
  },
  {
    id: 3,
    name: "Hudson River Trail",
    description: "Scenic riverside section perfect for tempo runs.",
    distance: 5000,
    elevation_gain: 25,
    avg_grade: 0.5,
    activity_type: "run",
    efforts_count: 890,
  },
];

export default function SegmentsPage() {
  const [segments, setSegments] = useState<Segment[]>(mockSegments);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredSegments = segments.filter((segment) => {
    const matchesSearch = segment.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || segment.activity_type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <FaTrophy className="text-yellow-500" />
          Segments
        </h1>
        <p className="text-gray-400 mt-1">
          Compete on popular segments and climb the leaderboards
        </p>
      </div>

      {/* Filters */}
      <Card variant="glass" padding="sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search segments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<FaSearch />}
            />
          </div>
          <div className="flex gap-2">
            {["all", "run", "ride"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Segments List */}
      {filteredSegments.length > 0 ? (
        <div className="grid gap-6">
          {filteredSegments.map((segment) => (
            <SegmentCard key={segment.id} segment={segment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
            <FaTrophy className="text-4xl text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No segments found
          </h3>
          <p className="text-gray-400">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
