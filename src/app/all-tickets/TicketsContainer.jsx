"use client";

import React, { useState, useMemo } from "react";
import {
  Magnifier,
  ArrowRotateLeft,
  CardClub,
  Compass,
  Tag,
} from "@gravity-ui/icons";
import TicketCard from "./TicketCard";

export default function TicketsContainer({ initialTickets = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [transportType, setTransportType] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");

  // Extract unique origins, destinations, and vehicle types dynamically
  const fromLocations = useMemo(() => {
    return Array.from(
      new Set(initialTickets.map((t) => t.fromLocation).filter(Boolean)),
    );
  }, [initialTickets]);

  const toLocations = useMemo(() => {
    return Array.from(
      new Set(initialTickets.map((t) => t.toLocation).filter(Boolean)),
    );
  }, [initialTickets]);

  const transportTypes = useMemo(() => {
    return Array.from(
      new Set(initialTickets.map((t) => t.transportType).filter(Boolean)),
    );
  }, [initialTickets]);

  // Real-time multi-criteria filtering
  const filteredTickets = useMemo(() => {
    return initialTickets.filter((ticket) => {
      const q = searchTerm.toLowerCase();
      const titleMatch = ticket.title?.toLowerCase().includes(q);
      const fromMatchText = ticket.fromLocation?.toLowerCase().includes(q);
      const toMatchText = ticket.toLocation?.toLowerCase().includes(q);

      const matchesSearch =
        !searchTerm || titleMatch || fromMatchText || toMatchText;
      const matchesFrom =
        !fromLocation ||
        ticket.fromLocation?.toLowerCase() === fromLocation.toLowerCase();
      const matchesTo =
        !toLocation ||
        ticket.toLocation?.toLowerCase() === toLocation.toLowerCase();
      const matchesTransport =
        transportType === "all" ||
        ticket.transportType?.toLowerCase() === transportType.toLowerCase();
      const matchesPrice =
        !maxPrice || Number(ticket.price) <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesFrom &&
        matchesTo &&
        matchesTransport &&
        matchesPrice
      );
    });
  }, [
    initialTickets,
    searchTerm,
    fromLocation,
    toLocation,
    transportType,
    maxPrice,
  ]);

  const handleReset = () => {
    setSearchTerm("");
    setFromLocation("");
    setToLocation("");
    setTransportType("all");
    setMaxPrice("");
  };

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="rounded-2xl border border-blue-100 bg-white/80 p-4 sm:p-5 shadow-sm backdrop-blur-md space-y-4">
        {/* Main Text Search */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Magnifier className="h-4 w-4 text-blue-500" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by route, city, or title (e.g. Dhaka, Sylhet, Express)..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Dropdowns & Filters */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {/* From Location */}
          <select
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
          >
            <option value="">From (All Locations)</option>
            {fromLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* To Location */}
          <select
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
          >
            <option value="">To (All Destinations)</option>
            {toLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* Transport Type */}
          <select
            value={transportType}
            onChange={(e) => setTransportType(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
          >
            <option value="all">All Transports</option>
            {transportTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Max Price */}
          <div className="relative">
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max Price (৳)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Reset Filters */}
          <button
            type="button"
            onClick={handleReset}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-800"
          >
            <ArrowRotateLeft className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs font-medium text-slate-500">
          <span>
            Found{" "}
            <strong className="text-blue-600">{filteredTickets.length}</strong>{" "}
            matching tickets
          </span>
          {initialTickets.length !== filteredTickets.length && (
            <span className="text-slate-400">
              Total: {initialTickets.length}
            </span>
          )}
        </div>
      </div>

      {/* Tickets Grid or Empty State */}
      {filteredTickets.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-blue-200 bg-white/50 p-12 text-center backdrop-blur-sm">
          <CardClub className="h-12 w-12 text-blue-300" />
          <h3 className="mt-4 text-lg font-semibold text-slate-700">
            No matching tickets found
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Try adjusting your search keywords, routes, or price filters.
          </p>
          <button
            onClick={handleReset}
            className="mt-4 rounded-xl bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-100"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
