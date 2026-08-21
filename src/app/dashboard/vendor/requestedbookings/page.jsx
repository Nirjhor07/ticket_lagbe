import React from "react";
import VendorTicketTable from "./VendorTicketTable";
import { getUserSession } from "@/lib/core/getUserSession";
import { allBookedTicketbyUserCreatedByVendor } from "@/lib/api/getAllBookedTicket";

const VendorRequestedPage = async () => {
  const session = await getUserSession();
  //   console.log("Vendor Session:", session?.id);//got the id
  const tickets =
    (await allBookedTicketbyUserCreatedByVendor(session?.id)) || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          User Booking Requests
        </h1>
        <p className="text-sm text-muted">
          Review, approve, or reject tickets submitted by users (
          {tickets.length} total).
        </p>
      </div>

      <VendorTicketTable initialTickets={tickets} />
    </div>
  );
};

export default VendorRequestedPage;
