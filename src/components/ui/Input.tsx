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
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              `
              w-full px-4 sm:px-5 py-3.5 rounded-xl
              bg-gray-800/50 border border-gray-700
              text-white placeholder-gray-500
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
              hover:border-gray-600
              disabled:opacity-50 disabled:cursor-not-allowed
            `,
              leftIcon ? "pl-11 sm:pl-12" : "",
              rightIcon ? "pr-11 sm:pr-12" : "",
              error ? "border-red-500 focus:ring-red-500" : "",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
