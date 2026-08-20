"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  ClockArrowRotateLeft,
  Compass,
  LocationArrow,
  LocationArrowFill,
  Persons,
  ShieldCheck,
  SparklesFill,
  Ticket,
  XmarkShape,
} from "@gravity-ui/icons";
import { postBookTicket } from "@/lib/actions/postBookTicket";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function TicketDetailsClient({ ticket }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingQty, setBookingQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const departureDateTime = ticket?.departureDateTime;

  // React Hook must be called at top-level before any return statement
  useEffect(() => {
    if (!departureDateTime) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(departureDateTime) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false,
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [departureDateTime]);

  // Conditional early return AFTER all hooks
  if (!ticket) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50/70 via-sky-50/30 to-white">
        <div className="rounded-2xl border border-blue-100 bg-white/80 p-8 text-center shadow-md backdrop-blur-md">
          <p className="text-base font-semibold text-slate-700">
            Ticket details not available.
          </p>
        </div>
      </div>
    );
  }

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
    vendorName,
    vendorEmail,
    vendorId,
  } = ticket;

  const isSoldOut = quantity <= 0;
  const isButtonDisabled = isSoldOut || timeLeft.isExpired;

  // getting user session client side
  const { data: session, isPending, error } = authClient.useSession();
  const user = session?.user || null;
  // console.log("user session in ticket details client", user?.id);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (bookingQty <= 0) {
      setErrorMsg("Please select at least 1 ticket.");
      return;
    }
    if (bookingQty > quantity) {
      setErrorMsg(`Cannot book more than ${quantity} available tickets.`);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ticketId: _id,
        quantity: bookingQty,
        vendorId,
        vendorEmail,
        title,
        price,
        imageUrl,
        fromLocation,
        toLocation,
        transportType,
        departureDateTime,
        bookedBy: user?.id || "user",
        status: "pending",
      };

      const res = await postBookTicket(payload);
      // console.log("Booking response:", res);
      if (res.insertedId) {
        toast.success("Ticket booked successfully!");
        setIsModalOpen(false);
        router.push(`/dashboard/user/bookticket`);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/70 via-sky-50/30 to-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-blue-100/80 bg-white/70 p-3 shadow-sm backdrop-blur-md">
              <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-96">
                <img
                  src={
                    imageUrl ||
                    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80"
                  }
                  alt={title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-sm">
                  <Compass className="h-3.5 w-3.5" />
                  {transportType}
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-100/80 bg-white/80 p-6 shadow-sm backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Express Transit
                  </span>
                  <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    {title}
                  </h1>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Vendor</span>
                  <p className="text-sm font-semibold text-slate-700">
                    {vendorName || "Verified Partner"}
                  </p>
                </div>
              </div>

              {/* Route section */}
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-blue-100/60 bg-blue-50/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <LocationArrow className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">From</p>
                    <p className="text-base font-bold text-slate-800">
                      {fromLocation}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">
                    Route
                  </span>
                  <ArrowRight className="h-5 w-5 text-blue-500" />
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <p className="text-xs text-slate-400">To</p>
                    <p className="text-base font-bold text-slate-800">
                      {toLocation}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                    <LocationArrowFill className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Perks */}
              {perks.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Included Amenities & Perks
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {perks.map((perk, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-1.5 text-xs font-semibold text-blue-700"
                      >
                        <SparklesFill className="h-3.5 w-3.5 text-blue-500" />
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Live Countdown Card */}
            <div className="rounded-3xl border border-blue-100/80 bg-white/80 p-6 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-2 text-slate-700">
                <ClockArrowRotateLeft className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold">Departure Countdown</h3>
              </div>

              {timeLeft.isExpired ? (
                <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-center text-sm font-semibold text-red-600">
                  This trip has already departed.
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                  {[
                    { label: "Days", val: timeLeft.days },
                    { label: "Hours", val: timeLeft.hours },
                    { label: "Mins", val: timeLeft.minutes },
                    { label: "Secs", val: timeLeft.seconds },
                  ].map((unit, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-blue-100 bg-blue-50/40 p-2"
                    >
                      <span className="block text-xl font-extrabold text-blue-700">
                        {unit.val}
                      </span>
                      <span className="text-[10px] font-medium uppercase text-slate-400">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {departureDateTime
                    ? new Date(departureDateTime).toLocaleDateString()
                    : ""}
                </span>
                <span>
                  {departureDateTime
                    ? new Date(departureDateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>
            </div>

            {/* Booking Action Box */}
            <div className="rounded-3xl border border-blue-100/80 bg-white/80 p-6 shadow-sm backdrop-blur-md">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-slate-500">
                  Price per unit
                </span>
                <span className="text-3xl font-black text-blue-600">
                  ৳{price}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Persons className="h-3.5 w-3.5 text-slate-400" />
                  Available Seats
                </span>
                <span className="font-bold text-slate-900">
                  {quantity} units left
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                disabled={isButtonDisabled}
                className={`mt-6 w-full rounded-2xl py-3.5 text-base font-bold transition-all shadow-md active:scale-[0.98] ${
                  isButtonDisabled
                    ? "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none"
                    : "bg-blue-600 text-white shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40"
                }`}
              >
                {timeLeft.isExpired
                  ? "Departure Passed"
                  : isSoldOut
                    ? "Sold Out"
                    : "Book Now"}
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Guaranteed Instant Confirmation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-blue-100 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            >
              <XmarkShape className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-blue-600">
              <Ticket className="h-6 w-6" />
              <h2 className="text-xl font-bold text-slate-900">
                Confirm Booking
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {title} • {fromLocation} to {toLocation}
            </p>

            <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Select Ticket Quantity (Max: {quantity})
                </label>
                <div className="mt-1.5">
                  <input
                    type="number"
                    min="1"
                    max={quantity}
                    value={bookingQty}
                    onChange={(e) => setBookingQty(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Price per unit:</span>
                  <span>৳{price}</span>
                </div>
                <div className="mt-1 flex justify-between text-xs text-slate-500">
                  <span>Quantity:</span>
                  <span>x {bookingQty}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-blue-100 pt-2 text-sm font-bold text-slate-900">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">
                    ৳{price * (bookingQty || 0)}
                  </span>
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs font-medium text-red-500">{errorMsg}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/30 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Confirm & Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
