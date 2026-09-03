"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  House,
  Person,
  Bars,
  Xmark,
  Calendar,
  FileText,
  CreditCard,
  Bell,
  Persons,
  Gear,
  ArrowRightFromSquare,
  ShieldCheck,
  Building,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export function DashboardSidebar({ userRole = "member" }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // 1. Club Member Links
  const navMemberLinks = [
    { icon: House, href: "/dashboard", label: "Dashboard" },
    { icon: FileText, href: "/dashboard/proposal", label: "Post a Proposal" },
    { icon: Calendar, href: "/dashboard/events", label: "Interested Events" },
    {
      icon: Person,
      href: "/dashboard/membership",
      label: "Apply for Membership",
    },
    { icon: Building, href: "/dashboard/bookings", label: "Facility Bookings" },
    {
      icon: CreditCard,
      href: "/dashboard/payments",
      label: "Dues & Transactions",
    },
    { icon: Bell, href: "/dashboard/notices", label: "Notices & Minutes" },
    { icon: Person, href: "/dashboard/profile", label: "My Profile" },
  ];

  // 2. Club Admin Links
  const navAdminLinks = [
    { icon: House, href: "/dashboard", label: "Dashboard" },
    {
      icon: Persons,
      href: "/dashboard/admin/members",
      label: "Manage Members",
    },
    {
      icon: FileText,
      href: "/dashboard/admin/proposals",
      label: "Review Proposals",
    },
    { icon: Calendar, href: "/dashboard/admin/events", label: "Manage Events" },
    {
      icon: Building,
      href: "/dashboard/admin/facilities",
      label: "Facility Controls",
    },
    {
      icon: CreditCard,
      href: "/dashboard/admin/finances",
      label: "Club Accounts",
    },
    {
      icon: Bell,
      href: "/dashboard/admin/broadcast",
      label: "Broadcast Notices",
    },
    {
      icon: ShieldCheck,
      href: "/dashboard/admin/roles",
      label: "Role Permissions",
    },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Club Settings" },
    { icon: Person, href: "/dashboard/profile", label: "Admin Profile" },
  ];

  const navItems = userRole === "admin" ? navAdminLinks : navMemberLinks;

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
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  const navContent = (
    <div className="flex h-full flex-col justify-between p-4 font-['Manrope',sans-serif]">
      <div className="space-y-6">
        {/* Brand & Close Button */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center font-black text-xs text-emerald-700 dark:text-emerald-400 font-['JetBrains_Mono',monospace]">
              BBFC
            </div>
            <span className="text-base font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {userRole === "admin" ? "Admin Portal" : "Member Portal"}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white lg:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <Xmark className="size-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-white"
                }`}
              >
                <item.icon
                  className={`size-4 transition-transform duration-200 group-hover:scale-110 ${
                    active
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-400 group-hover:text-zinc-700 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Role Pill & Sign Out */}
      <div className="space-y-3 pt-6 border-t border-zinc-200 dark:border-white/10">
        <div className="flex items-center justify-between px-2">
          <div className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 dark:bg-black/40 px-3 py-1.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 font-['JetBrains_Mono',monospace]">
            <span
              className={`h-2 w-2 rounded-full ${
                userRole === "admin"
                  ? "bg-amber-500 animate-pulse"
                  : "bg-emerald-500"
              }`}
            />
            <span className="capitalize">{userRole}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 dark:hover:text-red-300 transition-colors"
        >
          <ArrowRightFromSquare className="size-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden w-64 shrink-0 bg-white dark:bg-[#0c1410] border-r border-zinc-200 dark:border-emerald-950/60 shadow-lg lg:flex flex-col min-h-[calc(100vh-5rem)] sticky top-20 self-start transition-colors duration-300">
        {navContent}
      </aside>

      {/* Mobile Floating Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl shadow-emerald-950/50 hover:bg-emerald-500 active:scale-95 transition-all lg:hidden"
        aria-label="Open sidebar menu"
      >
        <Bars className="size-5" />
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <aside className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-[#0c1410] border-r border-zinc-200 dark:border-emerald-950/60 shadow-2xl transition-transform duration-300 ease-in-out">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
