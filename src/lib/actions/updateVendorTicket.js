import { serverMutation } from "../core/server";

export const updateVendorTicket = async (ticketId, updatedData) => {
  const res = await serverMutation(
    `/api/vendor/tickets/${ticketId}`,
    updatedData,
    "PATCH",
  );
  return res;
};
