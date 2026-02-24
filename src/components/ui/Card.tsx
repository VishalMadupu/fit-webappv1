import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "default" | "glass" | "gradient" | "elevated" | "bordered";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  style,
  variant = "default",
  hover = false,
  padding = "md",
  shadow = "md",
}) => {
  const baseStyles = "rounded-3xl transition-all duration-300";

  const variants = {
    default: "bg-gray-800/70 border border-gray-700/40",
    glass:
      "bg-gray-900/60 backdrop-blur-2xl border border-gray-700/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
    gradient:
      "bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/40",
    elevated: "bg-gray-800/80 border border-gray-700/30 shadow-card",
    bordered: "bg-gray-900/60 border-2 border-orange-500/25",
  };

  const paddings = {
    none: "",
    sm: "p-5 sm:p-6",
    md: "p-6 sm:p-8 lg:p-10",
    lg: "p-8 sm:p-10 lg:p-12",
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-lg shadow-black/20",
    lg: "shadow-xl shadow-black/30",
    xl: "shadow-2xl shadow-black/40",
  };

  const hoverStyles = hover
    ? "hover:border-orange-500/35 hover:shadow-xl hover:shadow-orange-500/8 hover:-translate-y-1 cursor-pointer"
    : "";

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        shadows[shadow],
        paddings[padding],
        hover && "card-enhanced",
        hoverStyles,
        className,
      )}
      style={style}
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
}) => <div className={cn("mb-5 sm:mb-6", className)}>{children}</div>;

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
}) => (
  <p className={cn("text-sm text-gray-400 mt-1.5", className)}>{children}</p>
);

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
  <div
    className={cn(
      "mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-700/40",
      className,
    )}
  >
    {children}
  </div>
);

export default Card;
