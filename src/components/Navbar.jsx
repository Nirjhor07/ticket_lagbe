"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useSyncExternalStore,
  startTransition,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";

const BASE_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/facilities", label: "Facilities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

const emptySubscribe = () => () => {};

// Helper to extract first and last initials (e.g., "Nirjhor Akash" -> "NA")
const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user || null;

  // Safely detect hydration / mounting
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Prevent SSR mismatch by checking `mounted`
  const navLinks = useMemo(() => {
    if (mounted && user?.name) {
      return [...BASE_NAV_LINKS, { href: "/dashboard", label: "Dashboard" }];
    }
    return BASE_NAV_LINKS;
  }, [mounted, user?.name]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Theme Hook
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Reset image error state when user changes
  useEffect(() => {
    setImageError(false);
  }, [user?.image]);

  // Auto-close drawers/menus on route change
  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
      setUserMenuOpen(false);
    });
  }, [pathname]);

  // Click outside listener for the avatar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll event listener
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth/login");
            router.refresh();
          },
        },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleTheme = () => {
    const currentTheme = resolvedTheme || theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const isDarkMode = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-['Manrope',sans-serif]
        ${
          scrolled
            ? "bg-white/90 dark:bg-[#0A0A0A]/95 backdrop-blur-2xl border-b border-zinc-200 dark:border-emerald-900/50 shadow-xl shadow-black/5 dark:shadow-black/80"
            : "bg-white/60 dark:bg-[#0A0A0A]/60 backdrop-blur-md border-b border-zinc-200/50 dark:border-white/5"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group flex-shrink-0"
          >
            <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-zinc-100 dark:bg-white/[0.08] p-1 ring-1.5 ring-amber-400/40 group-hover:ring-emerald-500 dark:group-hover:ring-emerald-400/80 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-300 backdrop-blur-md flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="British Bangladesh Friendship Club Ltd"
                  className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <p className="text-zinc-900 dark:text-white font-extrabold text-sm sm:text-base lg:text-lg leading-tight tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors duration-200">
                  BBFC{" "}
                  <span className="text-amber-600 dark:text-amber-400/90 font-medium text-xs sm:text-sm">
                    LTD
                  </span>
                </p>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-['JetBrains_Mono',monospace] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30">
                  2026
                </span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-[10px] sm:text-[11px] font-['JetBrains_Mono',monospace] uppercase tracking-wider mt-0.5 leading-none">
                Friendship · Progress · Prosperity
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    isActive(href)
                      ? "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/20 shadow-sm"
                      : "text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
                  }
                `}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all active:scale-95"
              aria-label="Toggle Theme"
            >
              {!mounted ? (
                <div className="w-5 h-5" />
              ) : isDarkMode ? (
                <svg
                  className="w-5 h-5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center gap-3">
              {!mounted || isPending ? (
                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              ) : user ? (
                <div className="flex items-center gap-3" ref={dropdownRef}>
                  {/* User Profile Avatar with Dropdown Toggle */}
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen((prev) => !prev)}
                      className="flex items-center gap-2 p-0.5 rounded-full ring-2 ring-emerald-500/30 hover:ring-emerald-500 transition-all active:scale-95 focus:outline-none"
                    >
                      {user.image && !imageError ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200 dark:border-white/10">
                          <img
                            src={user.image}
                            alt=""
                            referrerPolicy="no-referrer"
                            onError={() => setImageError(true)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center tracking-wider shadow-sm">
                          {getInitials(user.name)}
                        </div>
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-3 w-52 py-2 bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border border-zinc-200 dark:border-white/10 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-white/5">
                          <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                            {user?.email}
                          </p>
                        </div>

                        <div className="py-1">
                          <Link
                            href="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                          >
                            <svg
                              className="w-4 h-4 text-emerald-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                              />
                            </svg>
                            Dashboard
                          </Link>
                        </div>

                        <div className="py-1">
                          <Link
                            href="/dashboard/profile"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                          >
                            <svg
                              className="w-4 h-4 text-emerald-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            My Profile
                          </Link>
                        </div>

                        <div className="pt-1 border-t border-zinc-100 dark:border-white/5">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            Log Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Direct Log Out Button Beside Photo */}
                  <button
                    onClick={handleLogout}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/40 transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Log Out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm font-semibold shadow-lg shadow-emerald-950/20 dark:shadow-emerald-950/60 hover:shadow-emerald-900/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 border border-zinc-200 dark:border-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`
          lg:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${mobileOpen ? "max-h-[38rem] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 py-5 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-2xl border-t border-zinc-200 dark:border-white/10 flex flex-col gap-1.5">
          {/* Mobile User Details Card if Logged In */}
          {mounted && user && (
            <div className="flex items-center gap-3 p-3 mb-2 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/5">
              {user.image && !imageError ? (
                <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200 dark:border-white/10">
                  <img
                    src={user.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center tracking-wider">
                  {getInitials(user.name)}
                </div>
              )}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                  {user?.name || "User"}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {user?.email}
                </span>
              </div>
            </div>
          )}

          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 ${
                isActive(href)
                  ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20"
                  : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Mobile Auth Actions */}
          <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-white/10 flex flex-col gap-2">
            {!mounted || isPending ? (
              <div className="h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
            ) : user ? (
              <>
                <Link
                  href="/dashboard/profile"
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-white/[0.02] text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-500 text-white shadow-lg transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-white/[0.02] text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/30 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
