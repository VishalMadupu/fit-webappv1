import React from "react";
import { getInitials, cn } from "@/lib/utils";

export interface AvatarProps {
  src?: string | null;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  showBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = "md",
  className,
  showBorder = false,
}) => {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-14 h-14 text-lg",
    xl: "w-20 h-20 text-2xl",
  };

  const borderStyles = showBorder
    ? "ring-2 ring-orange-500 ring-offset-2 ring-offset-gray-900"
    : "";

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          "rounded-full object-cover",
          sizes[size],
          borderStyles,
          className
        )}
      />
    );
  }

  const initials = getInitials(name);

  // Generate consistent color based on name
  const colors = [
    "from-orange-500 to-red-500",
    "from-blue-500 to-purple-500",
    "from-green-500 to-teal-500",
    "from-pink-500 to-rose-500",
    "from-yellow-500 to-orange-500",
    "from-indigo-500 to-blue-500",
  ];

  const colorIndex =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  const gradientColor = colors[colorIndex];

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br",
        sizes[size],
        gradientColor,
        borderStyles,
        className
      )}
    >
      {initials}
    </div>
  );
};

export default Avatar;
