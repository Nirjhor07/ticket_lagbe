import { getUserSession } from "@/lib/core/getUserSession";
import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
  Bell,
  CircleCheck,
  CreditCard,
  Flame,
  LayoutCells,
  Magnifier,
  Persons,
  Plus,
  Pulse,
  Tag,
  Ticket,
} from "@gravity-ui/icons";

// Reusable Metric Card
const StatCard = ({ label, value, change, icon: Icon }) => (
  <div className="p-5 rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-slate-500 dark:text-zinc-400">
        {label}
      </span>
      <span className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
        <Icon className="w-4 h-4" />
      </span>
    </div>
    <div className="mt-4">
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
        <ArrowUp className="w-3.5 h-3.5" />
        <span>{change}</span>
      </div>
    </div>
  </div>
);

// Reusable Action Link
const ActionLink = ({ href, label }) => (
  <Link
    href={href}
    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition text-sm group"
  >
    <span className="font-medium text-slate-700 dark:text-zinc-200">
      {label}
    </span>
    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition" />
  </Link>
);

// 1. Admin Dashboard View
const AdminView = () => {
  const stats = [
    {
      label: "Platform Revenue",
      value: "৳ 1,420,500",
      change: "+18.2% this month",
      icon: CreditCard,
    },
    {
      label: "Total Tickets Sold",
      value: "18,450",
      change: "+2,100 this week",
      icon: Ticket,
    },
    {
      label: "Active Vendors",
      value: "128",
      change: "+12 pending approval",
      icon: Persons,
    },
    {
      label: "System Uptime",
      value: "99.98%",
      change: "All gateways operational",
      icon: Pulse,
    },
  ];

  const recentEvents = [
    {
      id: 1,
      title: "Dhaka Rock Fest 2026",
      meta: "Vendor: Live Events BD • 4,200 tickets",
      time: "10 mins ago",
    },
    {
      id: 2,
      title: "Green Line Express (Dhaka - Cox's Bazar)",
      meta: "Vendor: Green Line Paribahan • 850 tickets",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Chittagong Premier League Opening",
      meta: "Vendor: CTG Sports Hub • 12,000 tickets",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-sm p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h2 className="font-semibold text-base">Platform Activity</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Real-time bookings and vendor status
              </p>
            </div>
            <Link
              href="/admin/events"
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-zinc-800 mt-2">
            {recentEvents.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="p-1.5 mt-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                    <LayoutCells className="w-3.5 h-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate text-slate-800 dark:text-zinc-200">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      {item.meta}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 dark:text-zinc-500 whitespace-nowrap">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-base">Admin Operations</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Platform administration shortcuts
            </p>
            <div className="mt-4 space-y-2">
              <ActionLink
                href="/admin/vendors/verify"
                label="Verify Pending Vendors"
              />
              <ActionLink
                href="/admin/settlements"
                label="Review Vendor Payouts"
              />
              <ActionLink
                href="/admin/categories"
                label="Manage Ticket Categories"
              />
              <ActionLink href="/admin/system" label="Gateway Settings" />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 text-xs text-slate-500">
            Access Level:{" "}
            <span className="font-semibold text-rose-600">Super Admin</span>
          </div>
        </section>
      </div>
    </div>
  );
};

// 2. Vendor Dashboard View
const VendorView = () => {
  const stats = [
    {
      label: "Total Sales",
      value: "৳ 385,000",
      change: "+12.4% vs last week",
      icon: CreditCard,
    },
    {
      label: "Tickets Sold",
      value: "1,240 / 1,500",
      change: "82% occupancy rate",
      icon: Ticket,
    },
    {
      label: "Active Listings",
      value: "6",
      change: "2 expiring soon",
      icon: Tag,
    },
    {
      label: "Scanned / Checked-in",
      value: "840",
      change: "67% scanned so far",
      icon: CircleCheck,
    },
  ];

  const recentBookings = [
    {
      id: 1,
      title: "VIP Seat - 4 tickets booked",
      meta: "Dhaka to Sylhet AC • Order #TL-8821",
      time: "5 mins ago",
    },
    {
      id: 2,
      title: "Economy Seat - 2 tickets booked",
      meta: "Dhaka to Cox's Bazar • Order #TL-8819",
      time: "25 mins ago",
    },
    {
      id: 3,
      title: "Standard Pass - 1 ticket booked",
      meta: "Dhaka Tech Carnival • Order #TL-8802",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-sm p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h2 className="font-semibold text-base">Recent Ticket Sales</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Live customer reservations
              </p>
            </div>
            <Link
              href="/vendor/sales"
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1"
            >
              All Sales <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-zinc-800 mt-2">
            {recentBookings.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="p-1.5 mt-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <Ticket className="w-3.5 h-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate text-slate-800 dark:text-zinc-200">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      {item.meta}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 dark:text-zinc-500 whitespace-nowrap">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-base">Vendor Toolkit</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Manage trips, shows, and scans
            </p>
            <div className="mt-4 space-y-2">
              <ActionLink
                href="/vendor/events/create"
                label="Create New Ticket/Trip"
              />
              <ActionLink
                href="/vendor/scanner"
                label="Open Ticket QR Scanner"
              />
              <ActionLink
                href="/vendor/payouts"
                label="Request Bank Withdrawal"
              />
              <ActionLink
                href="/vendor/pricing"
                label="Manage Promo Codes & Discounts"
              />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 text-xs text-slate-500">
            Account Type:{" "}
            <span className="font-semibold text-indigo-600">
              Verified Merchant
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

// 3. User / Customer Dashboard View
const CustomerView = () => {
  const stats = [
    {
      label: "Reward Points",
      value: "1,250 pts",
      change: "Worth ৳ 125 discount",
      icon: Tag,
    },
    {
      label: "Available Coupons",
      value: "3 Active",
      change: "Up to 20% off on bus & events",
      icon: Tag,
    },
    {
      label: "Saved Payment Methods",
      value: "2 Accounts",
      change: "bKash & Visa linked",
      icon: CreditCard,
    },
    {
      label: "Travel History",
      value: "14 Trips",
      change: "Completed journeys",
      icon: CircleCheck,
    },
  ];

  const popularRoutes = [
    {
      id: 1,
      title: "Dhaka ➔ Cox's Bazar",
      category: "Bus & Flight",
      fare: "From ৳ 900",
      badge: "Popular",
    },
    {
      id: 2,
      title: "Dhaka ➔ Chittagong",
      category: "AC Bus & Train",
      fare: "From ৳ 650",
      badge: "High Demand",
    },
    {
      id: 3,
      title: "Dhaka ➔ Sylhet",
      category: "Bus & Resort Combo",
      fare: "From ৳ 750",
      badge: "Weekend Special",
    },
  ];

  const featuredEvents = [
    {
      id: 1,
      title: "Dhaka International Rock Fest",
      venue: "ICCB, Hall 4 • Next Friday",
      price: "৳ 1,200",
    },
    {
      id: 2,
      title: "National Tech & Startup Summit",
      venue: "Bangabandhu Int. Conference Center",
      price: "৳ 500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Quick Search & Discovery Banner */}
      <section className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-md">
        <div className="max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-100 text-xs font-medium backdrop-blur-sm">
            <Flame className="w-3.5 h-3.5 text-amber-300" /> Instant Ticket
            Booking
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Where are you traveling next?
          </h2>
          <p className="text-indigo-100 text-sm">
            Search buses, launches, flights, and live concert tickets at the
            best prices.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/search?type=bus"
            className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium text-sm transition backdrop-blur-sm border border-white/10"
          >
            <Ticket className="w-4 h-4" /> Bus Tickets
          </Link>
          <Link
            href="/search?type=events"
            className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium text-sm transition backdrop-blur-sm border border-white/10"
          >
            <Tag className="w-4 h-4" /> Events & Shows
          </Link>
          <Link
            href="/search?type=launch"
            className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium text-sm transition backdrop-blur-sm border border-white/10"
          >
            <LayoutCells className="w-4 h-4" /> Launch / Ship
          </Link>
          <Link
            href="/search?type=air"
            className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium text-sm transition backdrop-blur-sm border border-white/10"
          >
            <Pulse className="w-4 h-4" /> Air Flights
          </Link>
        </div>
      </section>

      {/* User Stats / Account Highlights */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      {/* Popular Routes & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Trending Routes & Events */}
        <section className="lg:col-span-2 rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-sm p-6 space-y-6">
          {/* Top Routes */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-semibold text-sm sm:text-base">
                Trending Travel Routes
              </h3>
              <Link
                href="/search"
                className="text-xs font-medium text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1"
              >
                Search all routes <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-zinc-800 mt-1">
              {popularRoutes.map((route) => (
                <div
                  key={route.id}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                        {route.title}
                      </p>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                        {route.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                      {route.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900 dark:text-zinc-100">
                      {route.fare}
                    </span>
                    <Link
                      href={`/search?route=${route.id}`}
                      className="block text-xs font-medium text-indigo-600 hover:underline mt-0.5"
                    >
                      Find Seats
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Events */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-semibold text-sm sm:text-base">
                Featured Live Events
              </h3>
              <Link
                href="/search?type=events"
                className="text-xs font-medium text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1"
              >
                View all events <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {featuredEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-lg border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                      {event.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                      {event.venue}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-zinc-700/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-zinc-100">
                      {event.price}
                    </span>
                    <Link
                      href={`/events/${event.id}`}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                    >
                      Book Pass →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right: Quick Links & Promo Section */}
        <section className="rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-base">Quick Shortcuts</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Account tools and booking preferences
            </p>
            <div className="mt-4 space-y-2">
              <ActionLink href="/search" label="Search & Compare Tickets" />
              <ActionLink href="/promotions" label="View Active Promo Codes" />
              <ActionLink
                href="/profile/passengers"
                label="Saved Passengers List"
              />
              <ActionLink
                href="/profile/payment-methods"
                label="Manage bKash / Cards"
              />
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
            <p className="text-xs font-bold text-amber-800 dark:text-amber-400">
              ⚡ Special Offer
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300/80 mt-1">
              Use code <strong className="font-mono">TLFIRST</strong> to get 10%
              off your next reservation.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

// Main Server Component
const DashboardPage = async () => {
  const user = await getUserSession();
  const displayName = user?.name || "User";
  const role = user?.role?.toLowerCase() || "user"; // "admin" | "vendor" | "user"

  const roleLabels = {
    admin: "Admin Control Center",
    vendor: "Vendor Portal",
    user: "Customer Portal",
  };

  const roleActionButtons = {
    admin: { label: "Add System Notice", href: "/admin/notices" },
    vendor: { label: "Add Ticket / Schedule", href: "/vendor/events/create" },
    user: { label: "Book a Ticket", href: "/search" },
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 p-6 md:p-10 space-y-8">
      {/* Top Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome, {displayName}
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {role}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Ticket Lagbe • {roleLabels[role] || "Dashboard"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="p-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          <Link
            href={roleActionButtons[role]?.href || "/search"}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium text-sm transition shadow-sm"
          >
            {role === "user" ? (
              <Magnifier className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {roleActionButtons[role]?.label || "Action"}
          </Link>
        </div>
      </header>

      {/* Role-specific Component Rendering */}
      {role === "admin" && <AdminView />}
      {role === "vendor" && <VendorView />}
      {role === "user" && <CustomerView />}
    </main>
  );
};

export default DashboardPage;
