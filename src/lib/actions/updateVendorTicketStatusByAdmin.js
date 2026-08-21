import { serverMutation } from "../core/server";

export const updateVendorTicketStatusByAdmin = async (ticketId, newStatus) => {
  const res = await serverMutation(
    `/api/admin/tickets/update/${ticketId}`,
    { status: newStatus },
    "PATCH",
  );
  return res;
};

// update advertisement status of a ticket by admin
export const advertisementStatusUpdate = async (ticketId, newStatus) => {
  const res = await serverMutation(
    `/api/admin/tickets/update/${ticketId}`,
    {
      advertisementStatus: newStatus,
    },
    "PATCH",
  );
  return res;
};
