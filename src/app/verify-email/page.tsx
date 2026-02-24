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

  useEffect(() => {
    if (email && !otpSent) {
      handleSendOTP();
    }
  }, [email]);

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
      setCountdown(60);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

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
        <div className="fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
        <div className="relative z-10 max-w-[440px] w-full">
          <Card
            variant="glass"
            padding="none"
            className="shadow-2xl shadow-black/50 text-center"
            style={{ padding: "40px", borderRadius: "24px" }}
          >
            <FaEnvelope className="text-orange-500 text-3xl mx-auto mb-4" />
            <h1
              className="text-[22px] font-bold text-white mb-2"
              style={{
                fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
              }}
            >
              No Email Provided
            </h1>
            <p className="text-gray-400 mb-6 text-[14px]">
              Please register first to verify your email.
            </p>
            <Link href="/register">
              <Button className="w-full" size="lg">
                Go to Register
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <div className="fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
        <div className="relative z-10 max-w-[440px] w-full">
          <Card
            variant="glass"
            padding="none"
            className="shadow-2xl shadow-black/50 text-center"
            style={{ padding: "40px", borderRadius: "24px" }}
          >
            <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
            <h1
              className="text-[28px] font-bold text-white mb-2"
              style={{
                fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                letterSpacing: "-0.02em",
              }}
            >
              Email Verified!
            </h1>
            <p className="text-gray-400 text-[14px]">
              Your email has been successfully verified. Redirecting to sign
              in...
            </p>
          </Card>
        </div>
      </div>
    );
  }

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
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-5">
              <FaEnvelope className="text-orange-500 text-xl" />
            </div>
            <h1
              className="text-[28px] font-bold text-white mb-2 leading-tight"
              style={{
                fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                letterSpacing: "-0.02em",
              }}
            >
              Verify email
            </h1>
            <p className="text-gray-400 text-[14px] leading-relaxed">
              We sent a 6-digit code to
              <br />
              <span className="text-orange-500 font-medium">{email}</span>
            </p>
          </div>

          {/* Divider */}
          <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8" />

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] text-center leading-relaxed">
              {error}
            </div>
          )}

          {/* OTP Input */}
          <div className="flex justify-center gap-3 mb-8">
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
                  "w-12 h-14 text-center text-xl font-bold rounded-xl",
                  "bg-gray-800/50 border",
                  "text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all duration-200",
                  digit
                    ? "border-orange-500/50 bg-orange-500/5"
                    : "border-gray-700/70 focus:border-orange-500/50",
                )}
                style={{
                  fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                }}
              />
            ))}
          </div>

          {/* Verify button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handleVerify}
            isLoading={isLoading}
            disabled={otp.join("").length !== 6}
          >
            Verify Email
          </Button>

          {/* Resend */}
          <div className="text-center text-[13px] text-gray-400 mt-5">
            Didn&apos;t receive the code?{" "}
            {countdown > 0 ? (
              <span className="text-gray-500">Resend in {countdown}s</span>
            ) : (
              <button
                onClick={handleSendOTP}
                disabled={isLoading}
                className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
              >
                Resend OTP
              </button>
            )}
          </div>

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
            Wrong email?{" "}
            <Link
              href="/register"
              className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
            >
              Go back
            </Link>
          </p>
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
