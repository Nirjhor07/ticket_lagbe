import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Tag,
  Sparkles,
  Persons,
  Compass,
  Ticket,
} from "@gravity-ui/icons";

export default function TicketCard({ ticket }) {
  const {
    _id,
    title,
    imageUrl,
    fromLocation,
    toLocation,
    transportType,
    price,
    quantity,
    perks = [],
    departureDateTime,
  } = ticket;

  //   console.log("ticket card destructure values", _id);

  // Format departure date and time
  const formattedDate = new Date(departureDateTime).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );
  const formattedTime = new Date(departureDateTime).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const isSoldOut = quantity <= 0;
  const isPast = new Date(departureDateTime) <= new Date();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-blue-100/80 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
      {/* Image & Badges */}
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-blue-50">
        <img
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?q=80"
          }
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Transport Type Badge */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-sm">
          <Compass className="h-3.5 w-3.5" />
          {transportType}
        </span>

        {/* Status Badge */}
        {(isSoldOut || isPast) && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500/90 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
            {isPast ? "Departed" : "Sold Out"}
          </span>
        )}
      </div>

      {/* Ticket Details */}
      <div className="mt-4 flex flex-1 flex-col justify-between">
        <div>
          {/* Route Section */}
          <div className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-800">
            <span className="truncate">{fromLocation}</span>
            <div className="flex items-center text-blue-600">
              <span className="h-[2px] w-6 bg-blue-300"></span>
              <ArrowRight className="h-4 w-4" />
            </div>
            <span className="truncate">{toLocation}</span>
          </div>

          <h3 className="mt-2 line-clamp-1 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {/* Departure Info */}
          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>
              {formattedDate} • {formattedTime}
            </span>
          </div>

          {/* Perks Preview */}
          {perks.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {perks.slice(0, 3).map((perk, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 rounded-md bg-blue-50/80 px-2 py-0.5 text-[11px] font-medium text-blue-700 border border-blue-100"
                >
                  <Sparkles className="h-2.5 w-2.5 text-blue-500" />
                  {perk}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Price, Seats & Action */}
        <div className="mt-5 border-t border-slate-100 pt-3">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[11px] font-medium text-slate-400">
                Price per unit
              </span>
              <p className="text-xl font-extrabold text-blue-600">৳{price}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
              <Ticket className="h-3.5 w-3.5 text-slate-400" />
              <span>{quantity} tickets available</span>
            </div>
          </div>

          <Link
            href={`/all-tickets/${_id}`}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/40 active:scale-[0.99]"
          >
            See details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
