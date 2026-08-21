import { serverFetch } from "../core/server";

export const getBookedTicketByUser = async (userId) => {
  const res = await serverFetch(`/api/my/booked/tickets?userId=${userId}`);
  return res;
};
