"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { Button, Card } from "@/components/ui";
import { ActivityForm, ActivityFormData } from "@/components/activities";

export default function NewActivityPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (data: ActivityFormData) => {
    setIsLoading(true);

    try {
      // In real app, this would call the API
      console.log("Creating activity:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/activities");
    } catch (error) {
      console.error("Failed to create activity:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          leftIcon={<FaArrowLeft />}
        >
          Back
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-white">Record Activity</h1>
        <p className="text-gray-400 mt-1">
          Log your workout and track your progress
        </p>
      </div>

      <Card variant="glass">
        <ActivityForm onSubmit={handleSubmit} isLoading={isLoading} />
      </Card>
    </div>
  );
}
