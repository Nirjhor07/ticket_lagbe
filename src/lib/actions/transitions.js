import { serverMutation } from "../core/server";

export const storePaymentData = async (body) => {
  const response = await serverMutation("/api/checkout_sessions", body);
  return response;
};
