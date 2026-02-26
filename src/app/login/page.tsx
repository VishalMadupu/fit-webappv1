"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaLock,
  FaRunning,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Button, Input, Card } from "@/components/ui";
import { authService } from "@/services/auth/authService";
import { useAuthStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { user } = await authService.login(formData);
      setUser(user);
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Invalid credentials. Please try again.",
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

      <div className="relative z-10 w-full max-w-[440px] animate-fadeScaleIn">
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
              Sign in
            </h1>
            <p className="text-gray-400 text-[14px] leading-relaxed">
              to continue to{" "}
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
            {/* Fields */}
            <div className="space-y-5 mb-5">
              <Input
                label="Username or Email"
                placeholder="Enter your username or email"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                leftIcon={<FaEnvelope />}
                required
              />

              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
            </div>

            {/* Remember me / Forgot */}
            <div className="flex items-center justify-between mb-8">
              <label className="flex items-center gap-2 text-[13px] text-gray-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 accent-orange-500"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-[13px] text-orange-500 hover:text-orange-400 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              size="sm"
              isLoading={isLoading}
            >
              Sign In
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
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
            >
              Create account
            </Link>
          </p>
        </Card>

        {/* Bottom legal */}
        <p className="text-center text-[11px] text-gray-600 mt-6 leading-relaxed">
          By continuing, you agree to FitTrack&apos;s{" "}
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
