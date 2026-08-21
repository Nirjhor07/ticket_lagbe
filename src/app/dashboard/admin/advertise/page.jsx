// app/admin/advertise/page.jsx (or your relevant route file)
import React from "react";
import { getAllTickets } from "@/lib/api/getAlltickets";
import AdvertiseTable from "./AdvertiseTable";

const AdminAdvertisePage = async () => {
  const allTickets = (await getAllTickets()) || [];

  // Filter only approved tickets
  const approvedTickets = allTickets.filter(
    (ticket) => ticket.status === "approved",
  );

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Manage Advertised Tickets
        </h1>
        <p className="text-sm text-gray-500">
          Toggle advertisement status to display tickets on the homepage (max 6
          active slots).
        </p>
      </div>

      <AdvertiseTable tickets={approvedTickets} />
    </main>
  );
};

export default AdminAdvertisePage;
