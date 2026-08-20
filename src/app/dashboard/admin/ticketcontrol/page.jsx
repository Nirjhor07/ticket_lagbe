import React from "react";
import { getAllTickets } from "@/lib/api/getAlltickets";
import AdminTicketTable from "./AdminTicketTable";

const AdminManageTicketPage = async () => {
  const tickets = await getAllTickets();

  return (
    <main className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Ticket Management
        </h1>
        <p className="text-sm text-muted">
          Review, approve, or reject vendor ticket submissions.
        </p>
      </div>

      <AdminTicketTable initialTickets={tickets} />
    </main>
  );
};

export default AdminManageTicketPage;
