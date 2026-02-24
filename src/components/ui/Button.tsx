import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success"
    | "warning"
    | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
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
      fullWidth = false,
      children,
      disabled,
      style,
      ...props
    },
    ref,
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center font-semibold rounded-2xl
      transition-all duration-200 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-[0.98] whitespace-nowrap relative overflow-hidden
      group btn-enhanced
    `;

    const variants = {
      primary: `
        bg-gradient-to-r from-orange-500 to-orange-600
        hover:from-orange-600 hover:to-orange-700
        text-white shadow-lg shadow-orange-500/20
        focus:ring-orange-500
        hover:shadow-orange-500/30
      `,
      secondary: `
        bg-gradient-to-r from-gray-700 to-gray-800
        hover:from-gray-600 hover:to-gray-700
        text-white
        focus:ring-gray-500
        hover:shadow-gray-700/20
      `,
      outline: `
        border-2 border-gray-600
        hover:border-orange-500 hover:text-orange-500
        text-gray-300 bg-transparent
        focus:ring-orange-500
        hover:bg-gray-800/50
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
        hover:shadow-red-500/30
      `,
      success: `
        bg-gradient-to-r from-green-500 to-green-600
        hover:from-green-600 hover:to-green-700
        text-white shadow-lg shadow-green-500/20
        focus:ring-green-500
        hover:shadow-green-500/30
      `,
      warning: `
        bg-gradient-to-r from-yellow-500 to-yellow-600
        hover:from-yellow-600 hover:to-yellow-700
        text-white shadow-lg shadow-yellow-500/20
        focus:ring-yellow-500
        hover:shadow-yellow-500/30
      `,
      link: `
        bg-transparent hover:bg-transparent
        text-orange-500 hover:text-orange-400
        underline decoration-transparent hover:decoration-orange-500
        focus:ring-orange-500
        transition-all duration-200
      `,
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-2",
      md: "px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base gap-2.5",
      lg: "px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg gap-3",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          className,
        )}
        disabled={disabled || isLoading}
        style={{
          fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
          letterSpacing: "0.03em",
          fontWeight: 700,
          ...style,
        }}
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
        {!isLoading && leftIcon && (
          <span className="group-hover:translate-x-[-2px] transition-transform">
            {leftIcon}
          </span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="group-hover:translate-x-[2px] transition-transform">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
