import TicketCard from "@/app/all-tickets/TicketCard";
import { getSixLatestTickets } from "@/lib/api/latestTickets";
import Link from "next/link";
import React from "react";

const LatestTickets = async () => {
  const tickets = (await getSixLatestTickets()) || [];

  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 bg-[#E3F2FD]">
      {/* Decorative Ambient Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-sky-400/25 via-indigo-400/20 to-blue-300/15 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -top-12 right-12 w-64 h-64 bg-indigo-400/15 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5 border-b border-sky-900/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/70 backdrop-blur-md text-blue-700 border border-white/60 shadow-sm mb-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              Just Added
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Latest Available Tickets
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl font-normal">
              Explore the freshest arrivals and newly scheduled journeys across
              routes.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {tickets.length > 0 && (
              <span className="inline-flex items-center gap-2 bg-white/75 backdrop-blur-md border border-white/80 px-4 py-2 rounded-xl shadow-xs text-xs font-semibold text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {tickets.length} New {tickets.length === 1 ? "Route" : "Routes"}
              </span>
            )}

            <Link
              href="/all-tickets"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-white/75 backdrop-blur-md hover:bg-blue-600 hover:text-white border border-white/80 px-4 py-2 rounded-xl shadow-xs transition-all duration-200 group"
            >
              <span>View All</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        {tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-sky-300/80 bg-white/40 backdrop-blur-sm py-20 px-6 text-center shadow-inner">
            <div className="p-4 bg-white rounded-2xl mb-4 text-sky-600 shadow-sm border border-sky-100">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No recent tickets found
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">
              New routes are posted frequently. Check back shortly for updated
              departures.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="group relative transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_35px_-10px_rgba(30,58,138,0.15)] rounded-2xl"
              >
                <TicketCard ticket={ticket} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestTickets;
