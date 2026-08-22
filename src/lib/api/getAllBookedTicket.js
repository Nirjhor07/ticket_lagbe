import { serverFetch, serverProtectedFetch } from "../core/server";

export const allBookedTicketbyUserCreatedByVendor = async (vendorId) => {
  const res = await serverProtectedFetch(
    `/api/vendor/booked/tickets?vendorId=${vendorId}`,
  );
  return res;
};
