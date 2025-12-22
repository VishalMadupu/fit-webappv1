"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaRunning,
  FaTrophy,
  FaUser,
  FaCog,
  FaPlus,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import { useUIStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { isSidebarOpen } = useUIStore();

  const mainLinks = [
    { href: "/dashboard", label: "Dashboard", icon: FaHome },
    { href: "/activities", label: "Activities", icon: FaRunning },
    { href: "/segments", label: "Segments", icon: FaTrophy },
    { href: "/stats", label: "Statistics", icon: FaChartLine },
    { href: "/social", label: "Social", icon: FaUsers },
  ];

  const bottomLinks = [
    { href: "/profile", label: "Profile", icon: FaUser },
    { href: "/settings", label: "Settings", icon: FaCog },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 bg-gray-900 border-r border-gray-800 transition-all duration-300",
        isSidebarOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex flex-col h-full py-6">
        {/* New Activity Button */}
        <div className="px-4 mb-6">
          <Link
            href="/activities/new"
            className={cn(
              "flex items-center justify-center gap-3 w-full py-3 rounded-xl",
              "bg-gradient-to-r from-orange-500 to-red-600",
              "text-white font-semibold shadow-lg shadow-orange-500/25",
              "hover:from-orange-600 hover:to-red-700 transition-all duration-200",
              "active:scale-[0.98]"
            )}
          >
            <FaPlus />
            {isSidebarOpen && <span>New Activity</span>}
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {mainLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                      isActive(link.href)
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50",
                      !isSidebarOpen && "justify-center"
                    )}
                    title={!isSidebarOpen ? link.label : undefined}
                  >
                    <Icon className="text-xl flex-shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">{link.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="px-3 pt-4 border-t border-gray-800">
          <ul className="space-y-1">
            {bottomLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                      isActive(link.href)
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50",
                      !isSidebarOpen && "justify-center"
                    )}
                    title={!isSidebarOpen ? link.label : undefined}
                  >
                    <Icon className="text-xl flex-shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">{link.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
