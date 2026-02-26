"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaRunning,
  FaBicycle,
  FaTrophy,
  FaMapMarkerAlt,
  FaChartLine,
  FaUsers,
  FaArrowRight,
  FaChevronDown,
  FaRoute,
  FaHeartbeat,
  FaMedal,
  FaClock,
  FaFire,
  FaBolt,
  FaGlobeAmericas,
  FaComments,
  FaStar,
} from "react-icons/fa";
import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui";

/* ── Feature data ────────────────────────────────────── */
const features = [
  {
    icon: FaMapMarkerAlt,
    title: "GPS Tracking",
    subtitle: "Precision at every step",
    description:
      "Track your activities with military-grade GPS precision. See your routes, pace, elevation, and splits in real-time. Every run, ride, and hike is recorded with stunning accuracy.",
    bullets: [
      "Real-time route mapping",
      "Pace & elevation tracking",
      "Auto-pause detection",
    ],
    gradient: "from-orange-500 to-red-600",
    accentColor: "#f97316",
    statCards: [
      { icon: FaRoute, value: "12.4", unit: "km" },
      { icon: FaClock, value: "54:32", unit: "time" },
      { icon: FaFire, value: "856", unit: "cal" },
    ],
  },
  {
    icon: FaTrophy,
    title: "Segments & Leaderboards",
    subtitle: "Compete. Conquer. Repeat.",
    description:
      "Challenge yourself on popular segments and climb the leaderboards. Earn crowns, set personal records, and see how you stack up against athletes worldwide.",
    bullets: [
      "Local & global leaderboards",
      "Personal record tracking",
      "Crown achievements",
    ],
    gradient: "from-yellow-500 to-orange-600",
    accentColor: "#eab308",
    statCards: [
      { icon: FaMedal, value: "#3", unit: "rank" },
      { icon: FaTrophy, value: "12", unit: "crowns" },
      { icon: FaBolt, value: "4:42", unit: "best" },
    ],
  },
  {
    icon: FaChartLine,
    title: "Advanced Analytics",
    subtitle: "Data-driven performance",
    description:
      "Deep dive into your performance with detailed charts, training load analysis, fitness trends, and AI-powered insights. Understand your body like never before.",
    bullets: [
      "Training load & fitness score",
      "Weekly/monthly trend analysis",
      "Heart rate zone breakdown",
    ],
    gradient: "from-emerald-500 to-green-600",
    accentColor: "#10b981",
    statCards: [
      { icon: FaChartLine, value: "87", unit: "fitness" },
      { icon: FaHeartbeat, value: "142", unit: "avg bpm" },
      { icon: FaBolt, value: "+12%", unit: "growth" },
    ],
  },
  {
    icon: FaUsers,
    title: "Social Community",
    subtitle: "Stronger together",
    description:
      "Connect with athletes worldwide. Follow friends, give kudos, join clubs, and share your achievements. Training is better when you have a community cheering you on.",
    bullets: [
      "Activity feed & kudos",
      "Clubs & group challenges",
      "Friend leaderboards",
    ],
    gradient: "from-blue-500 to-indigo-600",
    accentColor: "#3b82f6",
    statCards: [
      { icon: FaUsers, value: "2.4k", unit: "friends" },
      { icon: FaComments, value: "128", unit: "kudos" },
      { icon: FaStar, value: "5", unit: "clubs" },
    ],
  },
];

const activityTypes = [
  { icon: FaRunning, label: "Running", color: "from-orange-500 to-red-600" },
  { icon: FaBicycle, label: "Cycling", color: "from-cyan-500 to-blue-600" },
  {
    icon: FaGlobeAmericas,
    label: "Swimming",
    color: "from-blue-500 to-indigo-600",
  },
];

/* ── Scroll-reveal hook ────────────────────────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ── Single feature card component ─────────────── */
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useScrollReveal();
  const isReversed = index % 2 !== 0;
  const Icon = feature.icon;

  return (
    <div ref={ref} className={`scroll-card ${isReversed ? "reversed" : ""}`}>
      <div
        className={`flex flex-col ${
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center gap-10 lg:gap-16 p-6 sm:p-8 lg:p-10 rounded-3xl bg-gray-900/40 border border-gray-800/40 backdrop-blur-sm`}
      >
        {/* ── Image / Illustration Side ── */}
        <div className="card-image flex-1 w-full">
          <div className="feature-illustration">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />

            {/* Central icon */}
            <div className="relative z-10 flex flex-col items-center gap-5">
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-xl`}
                style={{
                  boxShadow: `0 16px 48px -12px ${feature.accentColor}40`,
                }}
              >
                <Icon className="text-white text-3xl" />
              </div>

              {/* Mini stat cards */}
              <div className="flex gap-2.5">
                {feature.statCards.map((stat, i) => {
                  const StatIcon = stat.icon;
                  return (
                    <div
                      key={i}
                      className="px-3 py-2.5 rounded-xl bg-gray-800/80 border border-gray-700/50 flex items-center gap-2"
                    >
                      <StatIcon
                        className="text-xs"
                        style={{ color: feature.accentColor }}
                      />
                      <div>
                        <div className="text-white text-xs font-bold leading-none">
                          {stat.value}
                        </div>
                        <div className="text-gray-500 text-[9px] uppercase tracking-wider mt-0.5">
                          {stat.unit}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Decorative rings */}
            <div
              className="absolute top-5 right-6 w-14 h-14 rounded-full border border-white/[0.04] animate-float"
              style={{ animationDuration: "5s" }}
            />
            <div
              className="absolute bottom-8 left-5 w-9 h-9 rounded-full border border-white/[0.04] animate-float"
              style={{ animationDuration: "6s", animationDelay: "1.5s" }}
            />
          </div>
        </div>

        {/* ── Text Side ── */}
        <div className="card-text flex-1">
          {/* Tag */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{
              background: `${feature.accentColor}10`,
              border: `1px solid ${feature.accentColor}25`,
            }}
          >
            <Icon className="text-xs" style={{ color: feature.accentColor }} />
            <span
              className="text-[11px] font-semibold tracking-wider uppercase"
              style={{
                color: feature.accentColor,
                fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
              }}
            >
              {feature.subtitle}
            </span>
          </div>

          <h3
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight"
            style={{
              fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
              letterSpacing: "-0.02em",
            }}
          >
            {feature.title}
          </h3>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
            {feature.description}
          </p>

          {/* Bullet points */}
          <ul className="space-y-2.5">
            {feature.bullets.map((bullet, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <div
                  className={`w-5 h-5 rounded-md bg-gradient-to-br ${feature.gradient} flex items-center justify-center shrink-0`}
                >
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── Home Page ─────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeScaleIn">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium mb-6 sm:mb-8">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Track Every Mile
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight max-w-5xl mx-auto"
              style={{
                fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                letterSpacing: "-0.03em",
              }}
            >
              Your Fitness Journey
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-orange-500">
                Starts Here
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10">
              Track your activities with GPS precision, compete on segments,
              connect with athletes worldwide, and achieve your fitness goals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-12">
              <Link href="/register">
                <Button
                  size="lg"
                  rightIcon={<FaArrowRight />}
                  className="shadow-lg shadow-orange-500/20 hover-scale-105 transition-transform"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover-scale-105 transition-transform"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Activity Types */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {activityTypes.map((type, index) => {
                const TypeIcon = type.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r ${type.color} bg-opacity-10 backdrop-blur-sm border border-gray-700/50 hover-scale-105 transition-transform`}
                  >
                    <TypeIcon className="text-white" />
                    <span className="text-white font-medium">{type.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <FaChevronDown className="text-gray-500 text-2xl" />
          </div>
        </div>
      </section>

      {/* ===== Features Section — Scroll-Triggered Cards ===== */}
      <section className="py-20 sm:py-28 lg:py-36 bg-gray-950 relative overflow-hidden">
        {/* Section divider lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-24">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
              style={{
                fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                letterSpacing: "-0.03em",
              }}
            >
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Excel
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mx-auto leading-relaxed">
              Powerful features designed for athletes of all levels. Track,
              analyze, and improve your performance.
            </p>
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-6" />
          </div>

          {/* Feature Cards — stacked vertically with scroll-triggered reveal */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {[
              { value: "10M+", label: "Activities Tracked" },
              { value: "500K+", label: "Athletes" },
              { value: "1M+", label: "Segments" },
              { value: "150+", label: "Countries" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-5 sm:p-6">
                <p
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-orange-500 mb-3"
                  style={{
                    fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-gray-400 font-medium text-sm sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-900/30 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            style={{
              fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join thousands of athletes who are already tracking their progress
            and achieving their goals with FitTrack.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                rightIcon={<FaArrowRight />}
                className="shadow-lg shadow-orange-500/20 hover-scale-105 transition-transform"
              >
                Create Free Account
              </Button>
            </Link>
            <Link href="/features">
              <Button
                variant="outline"
                size="lg"
                className="hover-scale-105 transition-transform"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
