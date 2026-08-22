import { getHeaders } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const deleteVendorTicket = async (ticketId) => {
  const headers = await getHeaders();
  const res = await fetch(`${baseUrl}/api/vendor/tickets/${ticketId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};
