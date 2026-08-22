"use server";

import { serverMutation, serverProtectedMutation } from "../core/server";

export const createTicket = async (ticketData) => {
  const res = await serverProtectedMutation(`/api/tickets`, ticketData);
  return res;
};
