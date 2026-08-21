"use client";

import React, { useState } from "react";
import {
  Bars,
  Xmark,
  Briefcase,
  House,
  Magnifier,
  Person,
  FileDollar,
  PersonFill,
  ArrowRightFromSquare,
  Ticket,
  Hammer,
  Persons,
  PlusShapeFill,
} from "@gravity-ui/icons";
import Link from "next/link";

export function DashboardSidebar({ userRole = "user" }) {
  const [isOpen, setIsOpen] = useState(false);

  const navUserLinks = [
    { icon: House, href: "/dashboard", label: "Dashboard" },
    { icon: Person, href: "/dashboard/user/profile", label: "User Profile" },
    {
      icon: Magnifier,
      href: "/dashboard/user/bookticket",
      label: "My Booked Ticket",
    },
    {
      icon: ArrowRightFromSquare,
      href: "/dashboard/user/transitions",
      label: "Transitions History",
    },
  ];

  const navVendorsLinks = [
    { icon: House, href: "/dashboard", label: "Dashboard" },
    {
      icon: PersonFill,
      href: "/dashboard/vendor/profile",
      label: "Vendor Profile",
    },
    {
      icon: Ticket,
      href: "/dashboard/vendor/addtickets",
      label: "Add Tickets",
    },
    {
      icon: Briefcase,
      href: "/dashboard/vendor/addedtickets",
      label: "My Added Tickets",
    },
    {
      icon: Ticket,
      href: "/dashboard/vendor/requestedbookings",
      label: "Requested Bookings",
    },
    {
      icon: FileDollar,
      href: "/dashboard/vendor/revenues",
      label: "Revenue Overview",
    },
  ];

  const navAdminLinks = [
    { icon: House, href: "/dashboard", label: "Dashboard" },
    { icon: Person, href: "/dashboard/admin/profile", label: "Admin Profile" },
    {
      icon: Hammer,
      href: "/dashboard/admin/ticketcontrol",
      label: "Manage Tickets",
    },
    {
      icon: Persons,
      href: "/dashboard/admin/usercontrol",
      label: "Manage Users",
    },
    {
      icon: PlusShapeFill,
      href: "/dashboard/admin/advertise",
      label: "Advertise Tickets",
    },
  ];

  const navUser = {
    user: navUserLinks,
    vendor: navVendorsLinks,
    admin: navAdminLinks,
    fraud: navVendorsLinks,
  };

  const navItems = navUser[userRole] || navUserLinks;
  const royalBlue = "bg-[#2C5EAD]";

  const navContent = (
    <div className="flex h-full flex-col justify-between p-4">
      <div>
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-xl font-bold tracking-wide text-white">
            Dashboard
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 text-white/70 hover:bg-white/15 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <Xmark className="size-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/90 transition-all duration-200 hover:bg-white/15 hover:text-white active:bg-white/20"
            >
              <item.icon className="size-5 text-white/70 transition-transform group-hover:scale-110 group-hover:text-white" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Role Pill */}
      <div className="pt-4">
        <div className="inline-flex items-center gap-2 rounded-lg bg-black/20 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md border border-white/10 shadow-inner">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="capitalize">Role: {userRole}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={`hidden w-64 shrink-0 ${royalBlue} border-r border-white/10 shadow-xl lg:flex flex-col min-h-screen sticky top-0 self-start`}
      >
        {navContent}
      </aside>

      {/* Mobile Floating Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#2C5EAD] text-white shadow-xl hover:bg-[#234c8c] lg:hidden"
        aria-label="Open sidebar menu"
      >
        <Bars className="size-6" />
      </button>

      {/* Mobile Drawer (High Z-Index Overlay) */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <aside
            className={`fixed inset-y-0 left-0 w-72 ${royalBlue} shadow-2xl transition-transform duration-300 ease-in-out`}
          >
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
