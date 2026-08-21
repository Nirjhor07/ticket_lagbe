import { serverMutation } from "../core/server";

export const updateUserBookingRequest = async (ticketId, newStatus) => {
  const res = await serverMutation(
    `/api/vendor/tickets/update/${ticketId}`,
    { status: newStatus },
    "PATCH",
  );
  return res;
};
