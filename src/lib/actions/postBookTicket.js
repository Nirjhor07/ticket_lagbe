import { serverMutation } from "../core/server";

export const postBookTicket = async (payload) => {
  const res = await serverMutation("/api/booked/tickets", payload);
  return res;
};
