import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FitTrack - GPS Fitness Tracker",
  description:
    "Track your fitness journey with GPS precision. Compete on segments, connect with friends, and achieve your goals.",
  keywords: [
    "fitness",
    "tracker",
    "GPS",
    "running",
    "cycling",
    "segments",
    "leaderboard",
  ],
  authors: [{ name: "FitTrack Team" }],
  openGraph: {
    title: "FitTrack - GPS Fitness Tracker",
    description: "Track your fitness journey with GPS precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
