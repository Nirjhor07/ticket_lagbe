import React from "react";
import { getAllTicketStatusApproved } from "@/lib/api/getAlltickets";
import { Compass, CardClub } from "@gravity-ui/icons";
import TicketCard from "./TicketCard";

const AllTicketsPage = async () => {
  const tickets = await getAllTicketStatusApproved();
  // console.log("all tickets page", tickets?.[0]?._id);

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

        {/* Tickets Grid */}
        {tickets && tickets.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-blue-200 bg-white/50 p-12 text-center backdrop-blur-sm">
            <CardClub className="h-12 w-12 text-blue-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-700">
              No Tickets Available
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              There are no approved tickets matching the criteria right now.
              Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTicketsPage;
