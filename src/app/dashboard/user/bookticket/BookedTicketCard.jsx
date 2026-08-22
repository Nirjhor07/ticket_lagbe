"use client";

import React from "react";
import { CountdownTimer } from "./CountdownTimer";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
  paid: "bg-blue-50 text-blue-700 border-blue-200",
};

export const BookedTicketCard = ({ ticket }) => {
  const totalPrice = ticket.price * ticket.quantity;

  // Checks if the ticket is accepted or approved
  const isAccepted =
    ticket.status === "accepted" || ticket.status === "approved";
  const isRejected = ticket.status === "rejected";
  console.log(isAccepted, isRejected, ticket.status);

  const formattedDeparture = new Date(ticket.departureDateTime).toLocaleString(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );

  const handlePayNow = () => {
    // Handle payment logic / redirection here

    console.log(`Initiating payment for booking: ${ticket._id}`);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Image & Badges */}
      <div className="relative h-48 w-full bg-slate-100">
        <img
          src={ticket.imageUrl}
          alt={ticket.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="rounded bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {ticket.transportType}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${
              statusStyles[ticket.status] || "bg-slate-100 text-slate-700"
            }`}
          >
            {ticket.status}
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-slate-900 capitalize line-clamp-1">
          {ticket.title}
        </h3>

        {/* Route Details */}
        <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
          <span className="font-medium text-slate-800">
            {ticket.fromLocation}
          </span>
          <span className="text-slate-400">→</span>
          <span className="font-medium text-slate-800">
            {ticket.toLocation}
          </span>
        </div>

        {/* Departure & Live Countdown */}
        <div className="mt-3 border-t border-slate-100 pt-3">
          <p className="text-xs text-slate-500">Departure</p>
          <p className="text-sm font-medium text-slate-800">
            {formattedDeparture}
          </p>

          {!isRejected ? (
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">Starts in:</span>
              <CountdownTimer departureDateTime={ticket.departureDateTime} />
            </div>
          ) : (
            <div className="mt-2">
              <span className="text-xs font-medium text-rose-500">
                Booking rejected
              </span>
            </div>
          )}
        </div>

        {/* Pricing Breakdown */}
        <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            <p className="text-xs text-slate-500">
              Quantity:{" "}
              <span className="font-semibold text-slate-700">
                {ticket.quantity}
              </span>
            </p>
            <p className="text-xs text-slate-500">
              Unit:{" "}
              <span className="font-medium text-slate-700">
                ${ticket.price}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Total Price</p>
            <p className="text-lg font-bold text-slate-900">
              <span className="font-extrabold text-xl mr-1">৳</span>
              {totalPrice}
            </p>
          </div>
        </div>

        {/* Pay Now Button */}
        <div className="mt-4 pt-2">
          {/* <button
            onClick={handlePayNow}
            disabled={!isAccepted}
            className={`w-full rounded-lg py-2 text-center text-sm font-semibold transition ${
              isAccepted
                ? "bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-sm active:scale-[0.98]"
                : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
            }`}
          >
            {ticket.status === "paid" ? "Paid" : "Pay Now"}
          </button> */}
          <form
            action="/api/checkout_sessions"
            method="POST"
            className="w-full"
          >
            {/* ব্যাকএন্ডে পাঠানোর জন্য হিডেন ইনপুট ফিল্ড */}
            <input type="hidden" name="ticketId" value={ticket._id} />
            <button
              type="submit"
              disabled={!isAccepted || ticket.status === "paid"}
              className={`w-full rounded-lg py-2 text-center text-sm font-semibold transition ${
                isAccepted && ticket.status !== "paid"
                  ? "bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-sm active:scale-[0.98]"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
              }`}
            >
              {ticket.status === "paid" ? "Paid" : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
