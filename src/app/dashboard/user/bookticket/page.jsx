import React from "react";
import { getBookedTicketByUser } from "@/lib/api/getBookedTicketByuser";
import { getUserSession } from "@/lib/core/getUserSession";
import { BookedTicketCard } from "./BookedTicketCard";

const UserBookedTickets = async () => {
  const session = await getUserSession();
  const userId = session?.id;

  const bookedTickets = userId ? await getBookedTicketByUser(userId) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            My Booked Tickets
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View booking status, departure schedules, and complete payments.
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            Total Bookings: {bookedTickets?.length || 0}
          </span>
        </div>
      </div>

      {/* 3-Column Grid */}
      {bookedTickets && bookedTickets.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookedTickets.map((ticket) => (
            <BookedTicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <p className="text-base font-medium text-slate-700">
            No booked tickets found
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Explore routes and make a reservation to see your tickets here.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserBookedTickets;
