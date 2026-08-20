import { serverMutation } from "../core/server";

export const updateVendorTicketStatusByAdmin = async (ticketId, newStatus) => {
  const res = await serverMutation(
    `/api/admin/tickets/update/${ticketId}`,
    { status: newStatus },
    "PATCH",
  );
  return res;
};
