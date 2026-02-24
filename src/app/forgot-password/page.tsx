"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaLock,
  FaEnvelope,
  FaCheck,
  FaArrowLeft,
  FaRunning,
} from "react-icons/fa";
import { Button, Input, Card } from "@/components/ui";
import { authService } from "@/services/auth/authService";

function PasswordResetContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [step, setStep] = useState<"request" | "reset" | "success">(
    token ? "reset" : "request",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authService.requestPasswordReset(email);
      setSuccessMessage("Password reset link sent to your email!");
      setStep("success");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Failed to send reset email. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      if (token) {
        await authService.resetPassword({ token, new_password: password });
        setSuccessMessage("Password reset successfully!");
        setStep("success");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Failed to reset password. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-16">
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
          style={{
            padding: "40px 40px 36px",
            borderRadius: "24px",
          }}
        >
          {step === "request" && (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1
                  className="text-[28px] font-bold text-white mb-2 leading-tight"
                  style={{
                    fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Reset password
                </h1>
                <p className="text-gray-400 text-[14px] leading-relaxed">
                  Enter your email to receive a reset link
                </p>
              </div>

              <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8" />

              {error && (
                <div className="mb-6 px-4 py-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] leading-relaxed">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="mb-6 px-4 py-3.5 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-[13px] leading-relaxed">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleRequestReset}>
                <div className="space-y-5 mb-8">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<FaEnvelope />}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  isLoading={isLoading}
                >
                  Send Reset Link
                </Button>
              </form>
            </>
          )}

          {step === "reset" && (
            <>
              <div className="text-center mb-8">
                <h1
                  className="text-[28px] font-bold text-white mb-2 leading-tight"
                  style={{
                    fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  New password
                </h1>
                <p className="text-gray-400 text-[14px] leading-relaxed">
                  Enter your new password below
                </p>
              </div>

              <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8" />

              {error && (
                <div className="mb-6 px-4 py-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] leading-relaxed">
                  {error}
                </div>
              )}

              <form onSubmit={handleResetPassword}>
                <div className="space-y-5 mb-8">
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    leftIcon={<FaLock />}
                    required
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    leftIcon={<FaLock />}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  isLoading={isLoading}
                >
                  Reset Password
                </Button>
              </form>
            </>
          )}

          {step === "success" && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-500/15 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-green-500/20">
                  <FaCheck className="text-green-400 text-2xl" />
                </div>
                <h1
                  className="text-[28px] font-bold text-white mb-2 leading-tight"
                  style={{
                    fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  All done!
                </h1>
                <p className="text-gray-400 text-[14px] leading-relaxed">
                  {successMessage}
                </p>
              </div>

              <Button onClick={handleGoToLogin} className="w-full" size="lg">
                Go to Sign In
              </Button>
            </>
          )}

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
            <Link
              href="/login"
              className="text-orange-500 hover:text-orange-400 font-semibold transition-colors inline-flex items-center gap-2"
            >
              <FaArrowLeft className="text-xs" /> Back to Sign In
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
    </div>
  );
}

export default function PasswordResetPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PasswordResetContent />
    </Suspense>
  );
}
