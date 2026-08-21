import { serverFetch } from "../core/server";

export const getAllTickets = async () => {
  const res = await serverFetch(`/api/admin/tickets`);
  return res;
};

export const getAllTicketStatusApproved = async () => {
  const res = await serverFetch(`/api/all/tickets/approved`);
  return res;
};

export const getAllticketAdvertiseStatus = async () => {
  const res = await serverFetch(`/api/all/tickets/active`);
  return res;
};
