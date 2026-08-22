import { serverFetch } from "../core/server";

export const revenueVendor = async (vendorId) => {
  const res = await serverFetch(`/api/vendor/revenue?vendorId=${vendorId}`);
  return res;
};
