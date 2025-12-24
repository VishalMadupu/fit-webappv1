"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaLock, FaEnvelope, FaCheck, FaArrowLeft } from "react-icons/fa";
import { Button, Input, Card } from "@/components/ui";
import { authService } from "@/services/auth/authService";

function PasswordResetContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [step, setStep] = useState<"request" | "reset" | "success">(
    token ? "reset" : "request"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // For requesting reset
  const [email, setEmail] = useState("");

  // For resetting password
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
          "Failed to send reset email. Please try again."
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
          "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
      <div className="fixed inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <FaLock className="text-white text-2xl" />
          </div>
          <span className="text-2xl font-bold text-orange-500">FitTrack</span>
        </Link>

        <Card variant="glass" className="p-6 sm:p-8">
          {step === "request" && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">
                  Reset Password
                </h1>
                <p className="text-gray-400">
                  Enter your email to receive a password reset link
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleRequestReset} className="space-y-6">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<FaEnvelope />}
                  required
                />

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
                <h1 className="text-2xl font-bold text-white mb-2">
                  Create New Password
                </h1>
                <p className="text-gray-400">Enter your new password below</p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-6">
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
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-green-500 text-2xl" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  {successMessage}
                </h1>
                <p className="text-gray-400">
                  Your password has been reset successfully
                </p>
              </div>

              <div className="space-y-4">
                <Button onClick={handleGoToLogin} className="w-full" size="lg">
                  Go to Login
                </Button>
              </div>
            </>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="text-orange-500 hover:text-orange-400 font-medium flex items-center justify-center gap-2"
            >
              <FaArrowLeft className="text-sm" /> Back to Login
            </Link>
          </div>
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
