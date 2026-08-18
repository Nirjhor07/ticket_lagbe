"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Gravity UI Icons
import {
  ChevronDown,
  ChevronUp,
  Person,
  PersonPlus,
  ArrowRightFromSquare,
} from "@gravity-ui/icons";
// import { authClient } from "@/lib/auth-client";

// Helper component to render Gravity UI icons directly from raw SVG data
function GravityIcon({ data, size = 16, className = "" }) {
  if (!data || !data.svg) return null;

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full ${className}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: data.svg }}
    />
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const pathname = usePathname();

  // const { data: session } = authClient.useSession();
  // const user = session?.user || null;
  const user = null; // Placeholder for user state, replace with actual user data from your auth system

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    // await authClient.signOut();
    // setIsMenuOpen(false);
    // setIsProfileDropdownOpen(false);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Tickets", href: "/all-tickets" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#90CAF9]/60 bg-[#E3F2FD]/90 backdrop-blur-xl shadow-lg shadow-[#1565C0]/5 transition-all duration-300">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-12 bg-[#90CAF9]/40 blur-[80px] pointer-events-none rounded-full" />

      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT SIDE: LOGO */}
        <div className="flex-1 flex justify-start z-20">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1565C0] to-[#2196F3] shadow-lg shadow-[#1565C0]/20 transition-transform duration-300 group-hover:scale-105 border border-[#90CAF9]/50">
              {/* Bus/Train SVG Icon */}
              <svg
                className="w-5 h-5 text-[#E3F2FD]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
              </svg>
            </div>

            <div className="leading-none flex flex-col justify-center">
              <h1 className="text-xl font-black text-[#1565C0] tracking-wider uppercase drop-shadow-sm">
                Ticket{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2196F3] to-[#1565C0]">
                  Lagbe
                </span>
              </h1>
            </div>
          </Link>
        </div>

        {/* CENTER: DESKTOP NAV LINKS - Fixed Z-index to make clickable */}
        <div className="hidden md:flex justify-center absolute left-1/2 -translate-x-1/2 z-30">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`block py-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-[#1565C0]"
                        : "text-[#1565C0]/70 hover:text-[#1565C0]"
                    }`}
                  >
                    {link.label}
                  </Link>

                  {/* Active Indicator - Glowing line underneath */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#1565C0] to-transparent rounded-full shadow-[0_0_8px_#90CAF9] pointer-events-none" />
                  )}

                  {/* Hover Indicator for Inactive Links */}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#90CAF9]/80 rounded-full transition-all duration-300 group-hover:w-1/2 pointer-events-none" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT SIDE: DESKTOP AUTH / MOBILE TOGGLE */}
        <div className="flex-1 flex justify-end items-center gap-4 z-20">
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Dropdown Trigger */}
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-3 rounded-full border border-[#90CAF9]/50 bg-[#E3F2FD]/80 p-1.5 pr-4 transition-all hover:bg-[#90CAF9]/30 hover:border-[#2196F3] focus:outline-none shadow-sm"
                >
                  <img
                    src={user?.image || "/default-avatar.png"}
                    alt="User Avatar"
                    className="h-9 w-9 rounded-full object-cover border-2 border-[#1565C0]"
                  />
                  <span className="text-sm font-bold text-[#1565C0]">
                    {user?.name || "User"}
                  </span>
                  <GravityIcon
                    data={isProfileDropdownOpen ? ChevronUp : ChevronDown}
                    size={14}
                    className="text-[#1565C0]/70"
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-[#90CAF9]/50 bg-[#E3F2FD]/95 p-2 shadow-xl backdrop-blur-xl transition-all">
                    <div className="border-b border-[#90CAF9]/60 mb-2 px-3 pb-3 pt-2">
                      <p className="text-sm font-bold text-[#1565C0]">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-[#1565C0]/70 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      href="/user/profile"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#1565C0]/90 transition hover:bg-[#90CAF9]/30 hover:text-[#1565C0]"
                    >
                      <GravityIcon data={Person} size={16} />
                      My Profile
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-600 mt-1"
                    >
                      <GravityIcon data={ArrowRightFromSquare} size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-sm font-bold text-[#1565C0]/80 hover:text-[#1565C0] transition-colors"
                >
                  Sign In
                </Link>

                <Link
                  href="/auth/signup"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1565C0] to-[#2196F3] px-5 py-2 text-sm font-bold text-white shadow-md shadow-[#1565C0]/20 hover:shadow-[#1565C0]/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE (Hamburger Icon) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#90CAF9]/50 bg-[#E3F2FD]/80 backdrop-blur-md text-[#1565C0] hover:bg-[#90CAF9]/30 transition-all md:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      <div
        className={`md:hidden border-t border-[#90CAF9]/50 bg-[#E3F2FD]/95 backdrop-blur-2xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4 px-4 py-6">
          {/* Mobile Links */}
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-xl px-4 py-3 text-base font-bold transition ${
                      isActive
                        ? "bg-[#90CAF9]/30 text-[#1565C0] border-l-4 border-[#1565C0]"
                        : "text-[#1565C0]/80 hover:bg-[#90CAF9]/30 hover:text-[#1565C0]"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Auth Actions */}
          <div className="border-t border-[#90CAF9]/60 pt-4">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-4 py-2 mb-2">
                  <img
                    src={user?.image || "/default-avatar.png"}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover border-2 border-[#1565C0]"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#1565C0]">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-[#1565C0]/80">{user?.email}</p>
                  </div>
                </div>

                <Link
                  href="/user/profile"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-[#1565C0]/90 hover:bg-[#90CAF9]/30 hover:text-[#1565C0] transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <GravityIcon data={Person} size={18} />
                  My Profile
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition"
                >
                  <GravityIcon data={ArrowRightFromSquare} size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/auth/signin"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#90CAF9] bg-[#E3F2FD] py-3 text-base font-bold text-[#1565C0] transition hover:bg-[#90CAF9]/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <GravityIcon data={Person} size={18} />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/auth/signup"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1565C0] to-[#2196F3] py-3 text-base font-bold text-white shadow-md shadow-[#1565C0]/20 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <GravityIcon data={PersonPlus} size={18} />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
