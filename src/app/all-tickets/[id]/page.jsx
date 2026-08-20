import { getticketByTicketId } from "@/lib/api/getTicketbyTicketId";
import React, { Suspense } from "react";
import TicketDetailsClient from "./TicketDetailsClient";
import Loading from "@/app/loading";

const TicketDetailsPage = async ({ params }) => {
  const { id } = await params;
  const ticket = await getticketByTicketId(id);
  // console.log("ticket details page ticket", ticket);
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <TicketDetailsClient ticket={ticket} />
      </Suspense>
    </div>
  );
};

export default TicketDetailsPage;
