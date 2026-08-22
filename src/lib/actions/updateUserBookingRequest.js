import { serverMutation, serverProtectedMutation } from "../core/server";

export const updateUserBookingRequest = async (ticketId, newStatus) => {
  const res = await serverProtectedMutation(
    `/api/vendor/tickets/update/${ticketId}`,
    { status: newStatus },
    "PATCH",
  );
  return res;
};
