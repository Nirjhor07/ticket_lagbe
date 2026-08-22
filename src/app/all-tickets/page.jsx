import React from "react";
import { getAllTicketStatusApproved } from "@/lib/api/getAlltickets";
import { Compass } from "@gravity-ui/icons";
import TicketsContainer from "./TicketsContainer";

const AllTicketsPage = async () => {
  const tickets = (await getAllTicketStatusApproved()) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/70 via-sky-50/30 to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Banner */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-sm">
            <Compass className="h-3.5 w-3.5 text-blue-600" />
            Verified Journeys
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Available <span className="text-blue-600">Tickets</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            Browse through all verified travel routes and secure your seats
            instantly.
          </p>
        </div>

        {/* Dynamic Search & Grid Container */}
        <TicketsContainer initialTickets={tickets} />
      </div>
    </div>
  );
};

export default AllTicketsPage;
