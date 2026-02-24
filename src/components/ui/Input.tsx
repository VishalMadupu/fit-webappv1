import React, { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      type = "text",
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            className="block text-sm font-semibold mb-2"
            style={{
              fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
              color: "rgba(209, 213, 219, 0.95)",
              letterSpacing: "0.01em",
            }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div
              className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-gray-500"
              style={{ paddingLeft: "14px", width: "3rem" }}
            >
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              `
              w-full rounded-xl
              bg-gray-800/50 border border-gray-700/70
              text-white text-sm placeholder-gray-500
              transition-all duration-200
              focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50
              hover:border-gray-600
              disabled:opacity-50 disabled:cursor-not-allowed
            `,
              leftIcon ? "pl-12 pr-5" : "px-5",
              rightIcon && !leftIcon ? "pr-12" : rightIcon ? "pr-12" : "",
              error
                ? "border-red-500/60 focus:ring-red-500/40 focus:border-red-500/50"
                : "",
              className,
            )}
            style={{
              fontFamily: "var(--font-inter, 'Inter', sans-serif)",
              paddingTop: "14px",
              paddingBottom: "14px",
              fontSize: "14px",
            }}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
