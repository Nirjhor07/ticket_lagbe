import { serverFetch } from "../core/server";

export const getticketByTicketId = async (ticketId) => {
  const res = await serverFetch(`/api/tickets/${ticketId}`);
  return res;
};
