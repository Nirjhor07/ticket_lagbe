import { serverFetch } from "../core/server";

export const getAllTickets = async () => {
  const res = await serverFetch(`/api/admin/tickets`);
  return res;
};
