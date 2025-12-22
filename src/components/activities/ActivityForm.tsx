"use client";

import React, { useState } from "react";
import {
  FaRunning,
  FaBicycle,
  FaSwimmer,
  FaWalking,
  FaMountain,
  FaDumbbell,
} from "react-icons/fa";
import { Button, Input, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

const activityTypes = [
  { value: "run", label: "Run", icon: FaRunning, color: "orange" },
  { value: "ride", label: "Ride", icon: FaBicycle, color: "cyan" },
  { value: "swim", label: "Swim", icon: FaSwimmer, color: "blue" },
  { value: "walk", label: "Walk", icon: FaWalking, color: "green" },
  { value: "hike", label: "Hike", icon: FaMountain, color: "emerald" },
  { value: "workout", label: "Workout", icon: FaDumbbell, color: "purple" },
];

export interface ActivityFormData {
  title: string;
  activity_type: string;
  description: string;
}

export interface ActivityFormProps {
  onSubmit: (data: ActivityFormData) => void;
  isLoading?: boolean;
  initialData?: Partial<ActivityFormData>;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData,
}) => {
  const [formData, setFormData] = useState<ActivityFormData>({
    title: initialData?.title || "",
    activity_type: initialData?.activity_type || "run",
    description: initialData?.description || "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ActivityFormData, string>>
  >({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof ActivityFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Activity Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Activity Type
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {activityTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = formData.activity_type === type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, activity_type: type.value })
                }
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                  isSelected
                    ? `border-${type.color}-500 bg-${type.color}-500/10 text-${type.color}-500`
                    : "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white"
                )}
                style={{
                  borderColor: isSelected
                    ? `var(--${type.color}-500, #f97316)`
                    : undefined,
                  backgroundColor: isSelected
                    ? `var(--${type.color}-500-10, rgba(249, 115, 22, 0.1))`
                    : undefined,
                  color: isSelected
                    ? `var(--${type.color}-500, #f97316)`
                    : undefined,
                }}
              >
                <Icon className="text-2xl" />
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Title */}
      <Input
        label="Activity Title"
        placeholder="Morning Run"
        value={formData.title}
        onChange={(e) => {
          setFormData({ ...formData, title: e.target.value });
          if (errors.title) setErrors({ ...errors, title: undefined });
        }}
        error={errors.title}
      />

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description (optional)
        </label>
        <textarea
          className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-gray-600 resize-none"
          rows={4}
          placeholder="How was your activity?"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="ghost">
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Create Activity
        </Button>
      </div>
    </form>
  );
};

export default ActivityForm;
