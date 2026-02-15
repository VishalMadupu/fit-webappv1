"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaRunning, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { Button, Card } from "@/components/ui";
import { authService } from "@/services/auth/authService";
import { cn } from "@/lib/utils";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otpSent, setOtpSent] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Send OTP on mount if email is present
  useEffect(() => {
    if (email && !otpSent) {
      handleSendOTP();
    }
  }, [email]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOTP = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.sendOTP(email);
      setOtpSent(true);
      setCountdown(60); // 60 second cooldown before resend
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    if (pastedData.length === 6) {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.verifyOTP(email, otpCode);
      setSuccess(true);
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid OTP code");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <Card variant="glass" className="p-8 text-center max-w-md">
          <FaEnvelope className="text-orange-500 text-4xl mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">
            No Email Provided
          </h1>
          <p className="text-gray-400 mb-6">
            Please register first to verify your email.
          </p>
          <Link href="/register">
            <Button>Go to Register</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <Card variant="glass" className="p-8 text-center max-w-md">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Email Verified!
          </h1>
          <p className="text-gray-400 mb-6">
            Your email has been successfully verified. Redirecting to login...
          </p>
        </Card>
      </div>
    );
  }

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
            <FaRunning className="text-white text-2xl" />
          </div>
          <span className="text-2xl font-bold text-orange-500">FitTrack</span>
        </Link>

        <Card variant="glass" className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-orange-500 text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-400">
              We sent a 6-digit code to
              <br />
              <span className="text-orange-500 font-medium">{email}</span>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* OTP Input */}
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={cn(
                  "w-12 h-14 text-center text-2xl font-bold rounded-xl",
                  "bg-gray-800/50 border-2 border-gray-700",
                  "text-white focus:border-orange-500 focus:outline-none",
                  "transition-all duration-200",
                )}
              />
            ))}
          </div>

          <Button
            className="w-full mb-4"
            size="lg"
            onClick={handleVerify}
            isLoading={isLoading}
            disabled={otp.join("").length !== 6}
          >
            Verify Email
          </Button>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Didn't receive the code?{" "}
              {countdown > 0 ? (
                <span className="text-gray-500">Resend in {countdown}s</span>
              ) : (
                <button
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="text-orange-500 hover:text-orange-400 font-medium"
                >
                  Resend OTP
                </button>
              )}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
            <p className="text-gray-400 text-sm">
              Wrong email?{" "}
              <Link
                href="/register"
                className="text-orange-500 hover:text-orange-400 font-medium"
              >
                Go back
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
          <div className="text-orange-500">Loading...</div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
