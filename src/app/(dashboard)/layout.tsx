"use client";

import React from "react";
import { useUIStore } from "@/lib/store";
import { Navbar, Sidebar } from "@/components/layout";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      {/* Sidebar - hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          "lg:ml-64", // Default sidebar width on large screens
          !isSidebarOpen && "lg:ml-20" // Collapsed sidebar
        )}
      >
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
