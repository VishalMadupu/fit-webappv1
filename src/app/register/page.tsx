"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaRunning,
  FaEye,
  FaEyeSlash,
  FaCheck,
} from "react-icons/fa";
import { Button, Input, Card } from "@/components/ui";
import { authService } from "@/services/auth/authService";
import { useAuthStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const passwordRequirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Contains uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Contains lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "Contains number", test: (p: string) => /\d/.test(p) },
];

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const failedRequirements = passwordRequirements.filter(
      (req) => !req.test(formData.password),
    );
    if (failedRequirements.length > 0) {
      setError("Please meet all password requirements");
      return;
    }

    setIsLoading(true);

    try {
      await authService.register(formData);
      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-16">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-500/8 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[480px] animate-fadeScaleIn">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-12">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <FaRunning className="text-white text-xl" />
          </div>
          <span
            className="text-2xl font-bold text-orange-500"
            style={{
              fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
              letterSpacing: "0.02em",
            }}
          >
            FitTrack
          </span>
        </Link>

        {/* Card */}
        <Card
          variant="glass"
          padding="none"
          className="shadow-2xl shadow-black/50"
          style={
            {
              padding: "40px 40px 36px",
              borderRadius: "24px",
            } as React.CSSProperties
          }
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="text-[28px] font-bold text-white mb-2 leading-tight"
              style={{
                fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                letterSpacing: "-0.02em",
              }}
            >
              Create account
            </h1>
            <p className="text-gray-400 text-[14px] leading-relaxed">
              to start your journey with{" "}
              <span className="text-orange-500 font-medium">FitTrack</span>
            </p>
          </div>

          {/* Gradient accent line */}
          <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8" />

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] leading-relaxed">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-5 mb-6">
              {/* Name + Username row on wider screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  leftIcon={<FaUser />}
                />
                <Input
                  label="Username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      username: e.target.value.toLowerCase(),
                    })
                  }
                  leftIcon={<FaUser />}
                  required
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                leftIcon={<FaEnvelope />}
                required
              />

              <div>
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  leftIcon={<FaLock />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 hover:text-orange-400 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  }
                  required
                />

                {/* Password Requirements */}
                {formData.password.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 p-3 rounded-xl bg-gray-800/40 border border-gray-700/40">
                    {passwordRequirements.map((req, index) => {
                      const isMet = req.test(formData.password);
                      return (
                        <div
                          key={index}
                          className={cn(
                            "flex items-center gap-2 text-[12px] transition-colors duration-200",
                            isMet ? "text-green-400" : "text-gray-500",
                          )}
                        >
                          <div
                            className={cn(
                              "w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0",
                              isMet
                                ? "bg-green-500/20 border border-green-500/40"
                                : "bg-gray-700/50 border border-gray-600/40",
                            )}
                          >
                            {isMet && (
                              <FaCheck className="text-[8px] text-green-400" />
                            )}
                          </div>
                          {req.label}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-gray-700/60" />
            <span className="text-[12px] text-gray-500 font-medium tracking-wide">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-700/60" />
          </div>

          {/* Footer */}
          <p className="text-center text-[13px] text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
            >
              Sign in instead
            </Link>
          </p>
        </Card>

        {/* Bottom legal */}
        <p className="text-center text-[11px] text-gray-600 mt-6 leading-relaxed">
          By creating an account, you agree to FitTrack&apos;s{" "}
          <Link
            href="/terms"
            className="hover:text-gray-400 transition-colors underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="hover:text-gray-400 transition-colors underline"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
