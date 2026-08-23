import React from "react";
import { getVendorsTickets } from "@/lib/api/getVendorsTickets";
import { getUserSession } from "@/lib/core/getUserSession";
import VendorTicketCard from "./vendorTicketCard";

export const dynamic = "force-dynamic";

const VendorAddedTicketPage = async () => {
  let tickets = [];

  try {
    const user = await getUserSession();
    if (user?.id) {
      tickets = await getVendorsTickets(user.id);
    }
  } catch (error) {
    // Let Next.js navigation control-flow errors pass through.
    if (
      error?.digest?.startsWith("NEXT_REDIRECT") ||
      error?.digest?.startsWith("NEXT_HTTP_ERROR_FALLBACK") ||
      error?.digest === "DYNAMIC_SERVER_USAGE"
    ) {
      throw error;
    }

    console.error("Failed to fetch tickets, falling back to mock:", error);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            My Added Tickets
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your transport listings, review approval states, and update
            inventory.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          <span>Total Tickets:</span>
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
            {tickets.length}
          </span>
        </div>
      </div>

      {/* 3-Column Grid */}
      {tickets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground font-medium">
            No tickets added yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <VendorTicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorAddedTicketPage;
