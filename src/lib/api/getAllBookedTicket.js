import { serverFetch } from "../core/server";

export const allBookedTicketbyUserCreatedByVendor = async (vendorId) => {
  const res = await serverFetch(
    `/api/vendor/booked/tickets?vendorId=${vendorId}`,
  );
  return res;
};
