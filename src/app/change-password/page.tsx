"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaLock, FaArrowLeft, FaRunning } from "react-icons/fa";
import { Button, Input, Card } from "@/components/ui";
import { authService } from "@/services/auth/authService";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      await authService.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      setSuccessMessage("Password changed successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Failed to change password. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
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
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="text-[28px] font-bold text-white mb-2 leading-tight"
              style={{
                fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                letterSpacing: "-0.02em",
              }}
            >
              Change password
            </h1>
            <p className="text-gray-400 text-[14px] leading-relaxed">
              Update your{" "}
              <span className="text-orange-500 font-medium">FitTrack</span>{" "}
              account password
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

          {/* Success */}
          {successMessage && (
            <div className="mb-6 px-4 py-3.5 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-[13px] leading-relaxed">
              {successMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleChangePassword}>
            <div className="space-y-5 mb-8">
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                leftIcon={<FaLock />}
                required
              />

              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                leftIcon={<FaLock />}
                required
              />

              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                leftIcon={<FaLock />}
                required
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Change Password
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
            <Link
              href="/dashboard"
              className="text-orange-500 hover:text-orange-400 font-semibold transition-colors inline-flex items-center gap-2"
            >
              <FaArrowLeft className="text-xs" /> Back to Dashboard
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
