import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center font-semibold rounded-xl
      transition-all duration-200 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-[0.98]
      whitespace-nowrap
    `;

    const variants = {
      primary: `
        bg-gradient-to-r from-orange-500 to-orange-600
        hover:from-orange-600 hover:to-orange-700
        text-white shadow-lg shadow-orange-500/20
        focus:ring-orange-500
      `,
      secondary: `
        bg-gradient-to-r from-gray-700 to-gray-800
        hover:from-gray-600 hover:to-gray-700
        text-white
        focus:ring-gray-500
      `,
      outline: `
        border-2 border-gray-600
        hover:border-orange-500 hover:text-orange-500
        text-gray-300 bg-transparent
        focus:ring-orange-500
      `,
      ghost: `
        bg-transparent hover:bg-gray-800
        text-gray-300 hover:text-white
        focus:ring-gray-500
      `,
      danger: `
        bg-gradient-to-r from-red-500 to-red-600
        hover:from-red-600 hover:to-red-700
        text-white shadow-lg shadow-red-500/20
        focus:ring-red-500
      `,
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs sm:text-sm gap-1.5",
      md: "px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base gap-2",
      lg: "px-5 sm:px-7 py-2.5 sm:py-3.5 text-base sm:text-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
