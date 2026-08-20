"use server";
import { serverFetch } from "../core/server";

export const getVendorsTickets = async (vendorId) => {
  const res = await serverFetch(`/api/vendor/tickets?vendorId=${vendorId}`);
  return res;
};
