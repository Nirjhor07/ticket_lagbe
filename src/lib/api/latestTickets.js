import { serverFetch } from "../core/server";

export const getSixLatestTickets = async () => {
  const res = await serverFetch(`/api/latest/tickets`);
  return res;
};
