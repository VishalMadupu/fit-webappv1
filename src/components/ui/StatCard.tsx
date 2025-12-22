import React from "react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  trend,
  className,
  size = "md",
}) => {
  const sizes = {
    sm: {
      container: "p-4 sm:p-5",
      label: "text-[10px] sm:text-xs",
      value: "text-lg sm:text-xl",
      icon: "w-9 h-9 sm:w-10 sm:h-10",
      iconSize: "text-base sm:text-lg",
    },
    md: {
      container: "p-4 sm:p-5 lg:p-6",
      label: "text-xs sm:text-sm",
      value: "text-xl sm:text-2xl",
      icon: "w-10 h-10 sm:w-11 sm:h-11",
      iconSize: "text-lg sm:text-xl",
    },
    lg: {
      container: "p-5 sm:p-6 lg:p-7",
      label: "text-sm sm:text-base",
      value: "text-2xl sm:text-3xl",
      icon: "w-11 h-11 sm:w-12 sm:h-12",
      iconSize: "text-xl sm:text-2xl",
    },
  };

  const sizeStyles = sizes[size];

  return (
    <div
      className={cn(
        "bg-gray-800/50 rounded-xl border border-gray-700/40 backdrop-blur-sm",
        "hover:border-gray-600/60 transition-all duration-200",
        sizeStyles.container,
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-gray-400 font-medium uppercase tracking-wider mb-1",
              sizeStyles.label
            )}
          >
            {label}
          </p>
          <p className={cn("font-bold text-white truncate", sizeStyles.value)}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-1.5">
              <span
                className={cn(
                  "text-xs sm:text-sm font-medium",
                  trend.isPositive ? "text-green-400" : "text-red-400"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-gray-500 text-[10px] sm:text-xs hidden sm:inline">
                vs last week
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "flex items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 flex-shrink-0",
              sizeStyles.icon
            )}
          >
            <span className={sizeStyles.iconSize}>{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
