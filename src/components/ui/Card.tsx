import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "gradient";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  hover = false,
  padding = "md",
}) => {
  const baseStyles = "rounded-2xl transition-all duration-300";

  const variants = {
    default: "bg-gray-800/70 border border-gray-700/50",
    glass: "bg-gray-900/50 backdrop-blur-xl border border-gray-700/40",
    gradient:
      "bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50",
  };

  const paddings = {
    none: "",
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-5 lg:p-6",
    lg: "p-5 sm:p-6 lg:p-8",
  };

  const hoverStyles = hover
    ? "hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-0.5 cursor-pointer"
    : "";

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        hoverStyles,
        className
      )}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
}) => <div className={cn("mb-4", className)}>{children}</div>;

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
}) => (
  <h3 className={cn("text-lg sm:text-xl font-bold text-white", className)}>
    {children}
  </h3>
);

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className,
}) => <p className={cn("text-sm text-gray-400 mt-1", className)}>{children}</p>;

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
}) => <div className={cn("", className)}>{children}</div>;

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
}) => (
  <div className={cn("mt-4 pt-4 border-t border-gray-700/50", className)}>
    {children}
  </div>
);

export default Card;
