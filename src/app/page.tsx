"use client";

import React from "react";
import Link from "next/link";
import {
  FaRunning,
  FaBicycle,
  FaTrophy,
  FaMapMarkerAlt,
  FaChartLine,
  FaUsers,
  FaArrowRight,
  FaMobile,
  FaShieldAlt,
  FaChevronDown,
} from "react-icons/fa";
import { Navbar, Footer } from "@/components/layout";
import { Button, Card } from "@/components/ui";

const features = [
  {
    icon: FaMapMarkerAlt,
    title: "GPS Tracking",
    description:
      "Track your activities with precision GPS. See your routes, pace, and elevation in real-time.",
    color: "orange",
  },
  {
    icon: FaTrophy,
    title: "Segments & Leaderboards",
    description:
      "Compete on popular segments and climb the leaderboards. Become the King or Queen of the Mountain.",
    color: "yellow",
  },
  {
    icon: FaChartLine,
    title: "Advanced Analytics",
    description:
      "Deep dive into your performance with detailed charts, trends, and personal records.",
    color: "green",
  },
  {
    icon: FaUsers,
    title: "Social Community",
    description:
      "Connect with athletes worldwide. Follow friends, give kudos, and share your achievements.",
    color: "blue",
  },
  {
    icon: FaMobile,
    title: "Mobile Ready",
    description:
      "Access your data anywhere. Fully responsive design works on any device.",
    color: "purple",
  },
  {
    icon: FaShieldAlt,
    title: "Privacy First",
    description:
      "Your data is yours. Control who sees your activities and routes with privacy zones.",
    color: "red",
  },
];

const activityTypes = [
  { icon: FaRunning, label: "Running", color: "from-orange-500 to-red-600" },
  { icon: FaBicycle, label: "Cycling", color: "from-cyan-500 to-blue-600" },
  { icon: FaRunning, label: "Swimming", color: "from-blue-500 to-indigo-600" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="animate-fadeIn">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Track Every Mile
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your Fitness Journey
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Track your activities with GPS precision, compete on segments,
              connect with athletes worldwide, and achieve your fitness goals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/register">
                <Button size="lg" rightIcon={<FaArrowRight />}>
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Activity Types */}
            <div className="flex items-center justify-center gap-6">
              {activityTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${type.color} bg-opacity-10`}
                    style={{
                      background: `linear-gradient(135deg, rgba(249,115,22,0.1), rgba(239,68,68,0.1))`,
                    }}
                  >
                    <Icon className="text-white" />
                    <span className="text-white font-medium">{type.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <FaChevronDown className="text-gray-500 text-2xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {" "}
                Excel
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powerful features designed for athletes of all levels. Track,
              analyze, and improve your performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} variant="glass" hover className="group">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon
                      className={`text-2xl text-${feature.color}-500`}
                      style={{
                        color:
                          feature.color === "orange" ? "#f97316" : undefined,
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "10M+", label: "Activities Tracked" },
              { value: "500K+", label: "Athletes" },
              { value: "1M+", label: "Segments" },
              { value: "150+", label: "Countries" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Join thousands of athletes who are already tracking their progress
            and achieving their goals with FitTrack.
          </p>
          <Link href="/register">
            <Button size="lg" rightIcon={<FaArrowRight />}>
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
