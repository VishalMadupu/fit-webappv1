import React from "react";
import Link from "next/link";
import { FaRunning, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Mobile App", href: "/app" },
        { label: "API", href: "/api" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-800/30 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top section */}
        <div className="py-14 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand - takes 5 columns */}
            <div className="lg:col-span-5">
              <Link href="/" className="flex items-center gap-2.5 mb-5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                  <FaRunning className="text-white text-lg" />
                </div>
                <span
                  className="text-xl font-bold text-orange-500"
                  style={{
                    fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                    letterSpacing: "0.01em",
                  }}
                >
                  FitTrack
                </span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
                Track your fitness journey with GPS precision. Compete on
                segments, connect with athletes worldwide, and achieve your
                goals.
              </p>

              {/* Social icons */}
              <div className="flex gap-2">
                {[
                  { icon: FaGithub, href: "https://github.com" },
                  { icon: FaTwitter, href: "https://twitter.com" },
                  { icon: FaInstagram, href: "https://instagram.com" },
                ].map((social, i) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <SocialIcon className="text-base" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Link columns - take 7 columns, spread evenly */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-6">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h4
                    className="text-white text-xs font-semibold uppercase tracking-widest mb-4"
                    style={{
                      fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
                    }}
                  >
                    {section.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200 block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800/30 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {currentYear} FitTrack. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
