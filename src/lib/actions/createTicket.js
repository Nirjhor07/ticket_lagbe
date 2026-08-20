"use server";

import { serverMutation } from "../core/server";

export const createTicket = async (ticketData) => {
  const res = await serverMutation(`/api/tickets`, ticketData);
  return res;
};
