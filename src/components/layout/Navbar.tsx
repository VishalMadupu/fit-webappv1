"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaRunning,
  FaTrophy,
  FaUser,
  FaBars,
  FaTimes,
  FaPlus,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import { useAuthStore } from "@/lib/store";
import { Avatar, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: FaHome },
    { href: "/activities", label: "Activities", icon: FaRunning },
    { href: "/segments", label: "Segments", icon: FaTrophy },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-2xl border-b border-gray-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <FaRunning className="text-white text-base sm:text-lg" />
            </div>
            <span
              className="text-xl sm:text-2xl font-bold text-orange-500"
              style={{
                fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                letterSpacing: "0.01em",
              }}
            >
              FitTrack
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive(link.href)
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-gray-400 hover:text-white hover:bg-white/5",
                    )}
                    style={{
                      fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                    }}
                  >
                    <Icon className="text-sm" />
                    <span className="hidden lg:inline">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <>
                {/* Search */}
                <button className="p-2.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all hidden sm:flex">
                  <FaSearch className="text-base" />
                </button>

                {/* New Activity */}
                <Link href="/activities/new" className="hidden sm:block">
                  <Button
                    size="sm"
                    leftIcon={<FaPlus />}
                    className="shadow-sm shadow-orange-500/10"
                  >
                    <span className="hidden lg:inline">New Activity</span>
                  </Button>
                </Link>

                {/* Notifications */}
                <button className="relative p-2.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  <FaBell className="text-base" />
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-500 rounded-full" />
                </button>

                {/* Profile */}
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2 ml-1 p-1 rounded-xl hover:bg-white/5 transition-all"
                >
                  <Avatar
                    src={user?.profile_picture}
                    name={user?.full_name || user?.username || "User"}
                    size="sm"
                  />
                </Link>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="shadow-sm shadow-orange-500/10">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && isAuthenticated && (
          <div className="md:hidden py-3 border-t border-gray-800/30 animate-fadeIn">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive(link.href)
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-gray-400 hover:text-white hover:bg-white/5",
                    )}
                    style={{
                      fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                    }}
                  >
                    <Icon className="text-base" />
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/activities/new"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-orange-500 hover:bg-orange-500/10 transition-all"
                style={{
                  fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                }}
              >
                <FaPlus className="text-base" />
                New Activity
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
