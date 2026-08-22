"use server";
import { serverFetch, serverProtectedFetch } from "../core/server";

export const getVendorsTickets = async (vendorId) => {
  const res = await serverProtectedFetch(
    `/api/vendor/tickets?vendorId=${vendorId}`,
  );
  return res;
};
