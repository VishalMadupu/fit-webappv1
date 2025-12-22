import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "text",
  width,
  height,
  animation = "pulse",
}) => {
  const baseStyles = "bg-gray-700";

  const variants = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-xl",
  };

  const animations = {
    pulse: "animate-pulse",
    wave: "animate-shimmer",
    none: "",
  };

  const style: React.CSSProperties = {
    width: width,
    height: height || (variant === "text" ? "1em" : undefined),
  };

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        animations[animation],
        className
      )}
      style={style}
    />
  );
};

// Skeleton presets for common use cases
export const SkeletonCard: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div
    className={cn(
      "p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50",
      className
    )}
  >
    <div className="flex items-center gap-3 mb-4">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1">
        <Skeleton width="60%" height={16} className="mb-2" />
        <Skeleton width="40%" height={12} />
      </div>
    </div>
    <Skeleton
      width="100%"
      height={200}
      variant="rectangular"
      className="mb-4"
    />
    <Skeleton width="80%" height={14} className="mb-2" />
    <Skeleton width="60%" height={14} />
  </div>
);

export const SkeletonActivityCard: React.FC = () => (
  <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
    <div className="flex items-center gap-3 mb-3">
      <Skeleton variant="circular" width={36} height={36} />
      <div className="flex-1">
        <Skeleton width="50%" height={14} className="mb-1" />
        <Skeleton width="30%" height={12} />
      </div>
    </div>
    <Skeleton width="70%" height={18} className="mb-2" />
    <div className="flex gap-4">
      <Skeleton width={60} height={40} variant="rectangular" />
      <Skeleton width={60} height={40} variant="rectangular" />
      <Skeleton width={60} height={40} variant="rectangular" />
    </div>
  </div>
);

export default Skeleton;
